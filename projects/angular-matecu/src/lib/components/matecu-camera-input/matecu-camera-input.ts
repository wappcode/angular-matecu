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
  AfterViewInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface ImageValidationResult {
  isValid: boolean;
  errors: string[];
}

interface ErrorMessages {
  invalidSize: string;
  invalidType: string;
  cameraError: string;
  processingError: string;
  notSupported: string;
}

export enum CameraInputState {
  IDLE = 'idle',
  CAMERA_LOADING = 'camera_loading',
  CAMERA_ACTIVE = 'camera_active',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type CameraCaptureMode = 'user' | 'environment';
export type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp';

@Component({
  selector: 'matecu-camera-input',
  imports: [CommonModule],
  templateUrl: './matecu-camera-input.html',
  styleUrls: ['./matecu-camera-input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MatecuCameraInput,
    },
  ],
})
export class MatecuCameraInput implements ControlValueAccessor, OnDestroy, AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  // State
  capturedImage?: File;
  imagePreviewUrl?: string;
  isDisabled = false;
  currentState: CameraInputState = CameraInputState.IDLE;
  validationErrors: string[] = [];
  isCameraActive = false;
  mediaStream?: MediaStream;

  private onChange: ((value: any) => void) | undefined;
  private onTouched: (() => void) | undefined;

  // Inputs - Basic functionality
  @Input() maxFileSize?: number; // tamaño máximo en bytes
  @Input() optimizeImage?: (img: File) => Promise<File>;
  @Input() maxImageWidth = 1920;
  @Input() maxImageHeight = 1080;
  @Input() imageQuality = 0.85; // 0.1 - 1.0
  @Input() imageFormat: ImageFormat = 'image/jpeg';
  @Input() displayName?: string;

  // Inputs - UI/UX
  @Input() enableGalleryPicker = true;
  @Input() enableCameraCapture = true;
  @Input() cameraMode: CameraCaptureMode = 'environment'; // 'user' para frontal, 'environment' para trasera
  @Input() showPreview = true;
  @Input() previewMaxWidth = 300;
  @Input() previewMaxHeight = 300;
  @Input() placeholder = 'Take a photo or select from gallery';
  @Input() cameraButtonText = 'Open Camera';
  @Input() galleryButtonText = 'Choose from Gallery';
  @Input() captureButtonText = 'Capture Photo';
  @Input() retakeButtonText = 'Retake';
  @Input() closeButtonText = 'Close';
  @Input() loadingText = 'Processing...';
  @Input() ariaLabel?: string;

  // Inputs - Validation
  @Input() acceptedImageTypes: string[] = ['image/jpeg', 'image/png', 'image/webp'];
  @Input() errorMessages: ErrorMessages = {
    invalidSize: 'Image exceeds maximum allowed size',
    invalidType: 'Only image files are allowed',
    cameraError: 'Unable to access camera',
    processingError: 'Error processing image',
    notSupported: 'Camera access not supported in this browser',
  };

  // Outputs
  @Output() imageSelected = new EventEmitter<File>();
  @Output() imageRemoved = new EventEmitter<File>();
  @Output() validationError = new EventEmitter<string[]>();
  @Output() stateChange = new EventEmitter<CameraInputState>();
  @Output() cameraOpened = new EventEmitter<void>();
  @Output() cameraClosed = new EventEmitter<void>();

  ngAfterViewInit(): void {
    // Component fully initialized
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  // ControlValueAccessor Methods
  writeValue(value: any): void {
    if (value instanceof File) {
      this.handleImageFile(value);
    } else if (typeof value === 'string' && value.startsWith('data:')) {
      this.imagePreviewUrl = value;
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
    if (isDisabled && this.isCameraActive) {
      this.closeCamera();
    }
  }

  // Public Methods
  async openCamera(): Promise<void> {
    if (this.isDisabled) return;

    try {
      this.changeState(CameraInputState.CAMERA_LOADING);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(this.errorMessages.notSupported);
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: this.cameraMode,
          width: { ideal: this.maxImageWidth },
          height: { ideal: this.maxImageHeight },
        },
        audio: false,
      };

      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = this.videoElement.nativeElement;
      videoElement.srcObject = this.mediaStream;

      console.log('Video element:', videoElement);
      console.log('Media stream:', this.mediaStream);

      // Start playing video
      await videoElement.play();

      // Set camera as active
      this.isCameraActive = true;
      this.changeState(CameraInputState.CAMERA_ACTIVE);
      console.log('Camera active state:', this.isCameraActive);
      console.log('Current state:', this.currentState);
      this.cameraOpened.emit();
    } catch (error) {
      console.error('Camera access error:', error);
      this.validationErrors = [this.errorMessages.cameraError];
      this.validationError.emit([...this.validationErrors]);
      this.changeState(CameraInputState.ERROR);
    }
  }

  closeCamera(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = undefined;
    }
    this.isCameraActive = false;
    this.videoElement.nativeElement.srcObject = null;
    this.changeState(CameraInputState.IDLE);
    this.cameraClosed.emit();
  }

  async capturePhoto(): Promise<void> {
    if (!this.isCameraActive || this.isDisabled) return;

    try {
      this.changeState(CameraInputState.PROCESSING);

      const video = this.videoElement.nativeElement;
      const canvas = this.canvasElement.nativeElement;
      const context = canvas.getContext('2d')!;

      // Set canvas dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0);

      // Convert to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert canvas to blob'));
            }
          },
          this.imageFormat,
          this.imageQuality,
        );
      });

      if (blob) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const extension = this.imageFormat.split('/')[1];
        const filename = `captured-${timestamp}.${extension}`;

        const file = new File([blob], filename, { type: this.imageFormat });
        await this.handleImageFile(file);
        this.closeCamera();
      }
    } catch (error) {
      console.error('Capture error:', error);
      this.validationErrors = [this.errorMessages.processingError];
      this.validationError.emit([...this.validationErrors]);
      this.changeState(CameraInputState.ERROR);
    }
  }

  openGalleryPicker(): void {
    if (this.isDisabled || !this.enableGalleryPicker) return;
    this.fileInput?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.handleImageFile(file);
    }

    // Reset input value to allow selecting same file again
    input.value = '';
  }

  removeImage(): void {
    if (this.capturedImage) {
      this.imageRemoved.emit(this.capturedImage);
    }
    this.resetComponent();
    this.notifyChange(null);
  }

  // Private Methods
  private async handleImageFile(file: File): Promise<void> {
    this.changeState(CameraInputState.PROCESSING);
    this.validationErrors = [];

    const validation = this.validateImage(file);
    if (!validation.isValid) {
      this.validationErrors = validation.errors;
      this.validationError.emit([...this.validationErrors]);
      this.changeState(CameraInputState.ERROR);
      return;
    }

    try {
      let processedFile = file;

      // Apply image optimization if provided
      if (this.optimizeImage) {
        try {
          processedFile = await this.optimizeImage(file);
        } catch (error) {
          console.warn('Error optimizing image:', error);
          // Continue with original file if optimization fails
        }
      }

      this.capturedImage = processedFile;
      this.generatePreview(processedFile);
      this.imageSelected.emit(processedFile);
      this.notifyChange(processedFile);
      this.changeState(CameraInputState.SUCCESS);
    } catch (error) {
      this.validationErrors = [this.errorMessages.processingError];
      this.validationError.emit([...this.validationErrors]);
      this.changeState(CameraInputState.ERROR);
    }
  }

  private validateImage(file: File): ImageValidationResult {
    const errors: string[] = [];

    // Validate file type
    if (!this.acceptedImageTypes.some((type) => file.type === type)) {
      errors.push(this.errorMessages.invalidType);
    }

    // Validate file size
    if (this.maxFileSize && file.size > this.maxFileSize) {
      errors.push(this.errorMessages.invalidSize);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private generatePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreviewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  private resetComponent(): void {
    this.capturedImage = undefined;
    this.imagePreviewUrl = undefined;
    this.validationErrors = [];
    this.cleanup();
    this.changeState(CameraInputState.IDLE);
  }

  private cleanup(): void {
    if (this.isCameraActive) {
      this.closeCamera();
    }
    if (this.imagePreviewUrl && this.imagePreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.imagePreviewUrl);
    }
  }

  private notifyChange(value: any): void {
    if (this.onChange) {
      this.onChange(value);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }

  private changeState(newState: CameraInputState): void {
    if (this.currentState !== newState) {
      this.currentState = newState;
      this.stateChange.emit(newState);
    }
  }

  // Utility Methods
  formatFileSize(file: File): string {
    const bytes = file.size;
    if (bytes === 0) return '0 bytes';

    const k = 1024;
    const sizes = ['bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);
    const formattedSize = i === 0 ? size.toString() : size.toFixed(2);

    return `${formattedSize} ${sizes[i]}`;
  }

  // Getters
  get hasImage(): boolean {
    return !!this.capturedImage;
  }

  get hasErrors(): boolean {
    return this.validationErrors.length > 0 || this.currentState === CameraInputState.ERROR;
  }

  get isLoading(): boolean {
    return (
      this.currentState === CameraInputState.PROCESSING ||
      this.currentState === CameraInputState.CAMERA_LOADING
    );
  }

  get canCapture(): boolean {
    return this.isCameraActive && !this.isLoading && !this.isDisabled;
  }

  get cameraSupported(): boolean {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
}
