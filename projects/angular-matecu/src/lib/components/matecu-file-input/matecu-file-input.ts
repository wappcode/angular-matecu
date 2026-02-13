/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface FileValidationResult {
  isValid: boolean;
  errors: string[];
}

interface ErrorMessages {
  invalidSize: string;
  invalidType: string;
  tooManyFiles: string;
  uploadError: string;
}

type FileSizeUnit = 'AUTO' | 'bytes' | 'KB' | 'MB' | 'GB' | 'TB';

export type { FileSizeUnit };

export enum FileInputState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

@Component({
  selector: 'matecu-file-input',
  imports: [CommonModule],
  templateUrl: './matecu-file-input.html',
  styleUrls: ['./matecu-file-input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MatecuFileInput,
    },
  ],
})
export class MatecuFileInput implements ControlValueAccessor, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // State
  files: File[] = [];
  file?: File;
  isDisabled = false;
  fileName?: string;
  selectedFileSize?: number;
  hasInvalidSize = false;
  hasInvalidType = false;
  previewUrl?: string;
  previewUrls = new Map<string, string>(); // Para múltiples archivos
  currentState: FileInputState = FileInputState.IDLE;
  validationErrors: string[] = [];
  isDragOver = false;

  private onChange: ((value: any) => void) | undefined;
  private onTouched: (() => void) | undefined;
  // Inputs - Funcionalidad básica
  @Input() optimizeImage?: (img: File) => Promise<File>;
  @Input() optimizeImageToSize?: number;
  @Input() maxFileSize?: number; // tamaño máximo en bytes
  @Input() maxFiles = 1;
  @Input() multiple = false;
  @Input() showFileSize = false;
  @Input() fileSizeUnit: FileSizeUnit = 'AUTO';
  @Input() displayName?: string;
  @Input() placeholder = 'Select a file or drag here';
  @Input() buttonText = 'Select file';
  @Input() loadingText = 'Processing...';
  @Input() ariaLabel?: string;

  // Inputs - Validación
  @Input() acceptedMimeTypes: string[] = [];
  @Input() acceptedExtensions: string[] = [];
  @Input() errorMessages: ErrorMessages = {
    invalidSize: 'File exceeds maximum allowed size',
    invalidType: 'File type not allowed',
    tooManyFiles: 'Maximum number of files exceeded',
    uploadError: 'Error processing file',
  };

  // Inputs - UI/UX
  @Input() enableDragDrop = true;
  @Input() showPreview = false;
  @Input() previewMaxWidth = 200;
  @Input() previewMaxHeight = 200;
  @Input() showProgress = false;

  // Outputs
  @Output() fileSelected = new EventEmitter<File>();
  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() fileRemoved = new EventEmitter<File>();
  @Output() validationError = new EventEmitter<string[]>();
  @Output() dragEnter = new EventEmitter<DragEvent>();
  @Output() dragLeave = new EventEmitter<DragEvent>();
  @Output() stateChange = new EventEmitter<FileInputState>();
  // ControlValueAccessor Methods
  writeValue(value: any): void {
    if (value instanceof File) {
      this.handleSingleFile(value);
    } else if (Array.isArray(value)) {
      this.handleMultipleFiles(value);
    } else if (typeof value === 'string') {
      this.fileName = value;
    } else {
      this.resetComponent();
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.changeState(this.isDisabled ? FileInputState.IDLE : this.currentState);
  }

  ngOnDestroy(): void {
    this.cleanupPreview();
  }

  // Event Handlers
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedFiles = Array.from(input.files || []);
    this.handleFileSelection(selectedFiles);
  }

  onDragOver(event: DragEvent): void {
    if (!this.enableDragDrop || this.isDisabled) return;
    event.preventDefault();
    event.stopPropagation();
    if (!this.isDragOver) {
      this.isDragOver = true;
      this.dragEnter.emit(event);
    }
  }

  onDragLeave(event: DragEvent): void {
    if (!this.enableDragDrop || this.isDisabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    this.dragLeave.emit(event);
  }

  onDrop(event: DragEvent): void {
    if (!this.enableDragDrop || this.isDisabled) return;
    event.preventDefault();
    event.stopPropagation();

    this.isDragOver = false;
    const files = Array.from(event.dataTransfer?.files || []);
    this.handleFileSelection(files);
  }

  openFileDialog(): void {
    if (this.isDisabled) return;
    this.fileInput?.nativeElement.click();
  }

  removeFile(fileToRemove: File): void {
    // Limpiar preview del archivo eliminado
    const fileKey = `${fileToRemove.name}-${fileToRemove.size}-${fileToRemove.lastModified}`;
    const previewUrl = this.previewUrls.get(fileKey);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
      this.previewUrls.delete(fileKey);
    }
    if (this.multiple) {
      this.files = this.files.filter((file) => file !== fileToRemove);
      this.notifyChange(this.files.length > 0 ? this.files : null);
      this.filesSelected.emit([...this.files]);
    } else {
      this.resetComponent();
      this.notifyChange(null);
    }
    this.fileRemoved.emit(fileToRemove);
  }
  // Private Methods
  private async handleFileSelection(selectedFiles: File[]): Promise<void> {
    if (selectedFiles.length === 0) return;

    this.changeState(FileInputState.LOADING);
    this.validationErrors = [];

    try {
      // Validar número máximo de archivos
      if (selectedFiles.length > this.maxFiles) {
        this.validationErrors.push(this.errorMessages.tooManyFiles);
        this.changeState(FileInputState.ERROR);
        return;
      }

      const processedFiles: File[] = [];

      for (const file of selectedFiles) {
        const validation = this.validateFile(file);
        if (!validation.isValid) {
          this.validationErrors.push(...validation.errors);
          continue;
        }

        try {
          const processedFile = await this.processFile(file);
          if (processedFile) {
            processedFiles.push(processedFile);
          }
        } catch (error) {
          this.validationErrors.push(this.errorMessages.uploadError);
        }
      }

      if (this.validationErrors.length > 0) {
        this.validationError.emit([...this.validationErrors]);
        this.changeState(FileInputState.ERROR);
        return;
      }

      if (processedFiles.length > 0) {
        if (this.multiple) {
          this.files = processedFiles;
          this.filesSelected.emit([...this.files]);
          this.notifyChange(this.files);
        } else {
          this.file = processedFiles[0];
          this.handleSingleFile(this.file);
          this.fileSelected.emit(this.file);
          this.notifyChange(this.file);
        }

        this.changeState(FileInputState.SUCCESS);
      }
    } catch (error) {
      this.validationErrors.push(this.errorMessages.uploadError);
      this.validationError.emit([...this.validationErrors]);
      this.changeState(FileInputState.ERROR);
    }
  }

  private handleSingleFile(file: File): void {
    this.file = file;
    this.fileName = this.displayName || file.name;
    this.selectedFileSize = this.calculateFileSizeInMB(file);
    this.generatePreview(file);
  }

  private handleMultipleFiles(files: File[]): void {
    this.files = files;
    this.file = files[0] || undefined;
    this.fileName = files.length > 0 ? `${files.length} file(s) selected` : undefined;
  }

  private async processFile(file: File): Promise<File | undefined> {
    if (this.optimizeImage && file.type.includes('image') && this.optimizeImageToSize) {
      try {
        return await this.optimizeImage(file);
      } catch (error) {
        console.warn('Error optimizing image:', error);
        return file; // Return original if optimization fails
      }
    }
    return file;
  }

  private validateFile(file: File): FileValidationResult {
    const errors: string[] = [];

    // Validar tamaño
    if (this.maxFileSize && file.size > this.maxFileSize) {
      errors.push(this.errorMessages.invalidSize);
    }

    // Validar tipo MIME
    if (this.acceptedMimeTypes.length > 0) {
      if (!this.acceptedMimeTypes.some((type) => file.type.includes(type))) {
        errors.push(this.errorMessages.invalidType);
      }
    }

    // Validar extensión
    if (this.acceptedExtensions.length > 0) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!this.acceptedExtensions.some((ext) => ext.toLowerCase() === fileExtension)) {
        errors.push(this.errorMessages.invalidType);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private generatePreview(file: File): void {
    this.cleanupPreview();

    if (this.showPreview && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  private cleanupPreview(): void {
    // Limpiar preview simple
    if (this.previewUrl && this.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.previewUrl);
    }
    this.previewUrl = undefined;

    // Limpiar previews múltiples
    this.previewUrls.forEach((url) => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    this.previewUrls.clear();
  }

  private resetComponent(): void {
    this.files = [];
    this.file = undefined;
    this.fileName = undefined;
    this.selectedFileSize = undefined;
    this.validationErrors = [];
    this.hasInvalidSize = false;
    this.hasInvalidType = false;
    this.cleanupPreview();
    this.changeState(FileInputState.IDLE);
  }

  private notifyChange(value: any): void {
    if (this.onChange) {
      this.onChange(value);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }

  private changeState(newState: FileInputState): void {
    if (this.currentState !== newState) {
      this.currentState = newState;
      this.stateChange.emit(newState);
    }
  }

  calculateFileSizeInMB(file: File): number {
    const sizeInMB = file.size / 1024 / 1024;
    return sizeInMB > 0.01 ? sizeInMB : 0.01;
  }

  formatFileSize(file: File): string {
    const bytes = file.size;

    if (bytes === 0) return '0 bytes';

    const k = 1024;
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];

    // Si se especifica una unidad específica, usarla
    if (this.fileSizeUnit !== 'AUTO') {
      const targetUnitIndex = sizes.indexOf(this.fileSizeUnit);
      if (targetUnitIndex !== -1) {
        const size = bytes / Math.pow(k, targetUnitIndex);
        const formattedSize = targetUnitIndex === 0 ? size.toString() : size.toFixed(2);
        return `${formattedSize} ${this.fileSizeUnit}`;
      }
    }

    // Comportamiento AUTO (original)
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);
    const formattedSize = i === 0 ? size.toString() : size.toFixed(2);

    return `${formattedSize} ${sizes[i]}`;
  }

  // Public Utility Methods
  getFileIcon(file?: File): string {
    if (!file) return 'insert_drive_file';

    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.includes('pdf')) return '📄';
    if (file.type.startsWith('video/')) return '🎥';
    if (file.type.startsWith('audio/')) return '🎵';
    if (file.type.includes('zip') || file.type.includes('rar')) return '🗜️';
    if (file.type.includes('word')) return '📝';
    if (file.type.includes('excel') || file.type.includes('sheet')) return '📊';

    return '📄';
  }

  getPreviewUrl(file: File): string {
    if (!file.type.startsWith('image/')) return '';

    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;

    if (!this.previewUrls.has(fileKey)) {
      const url = URL.createObjectURL(file);
      this.previewUrls.set(fileKey, url);
    }

    return this.previewUrls.get(fileKey) || '';
  }

  get hasErrors(): boolean {
    return this.validationErrors.length > 0 || this.currentState === FileInputState.ERROR;
  }

  get isLoading(): boolean {
    return this.currentState === FileInputState.LOADING;
  }

  get hasFiles(): boolean {
    return this.multiple ? this.files.length > 0 : !!this.file;
  }
}
