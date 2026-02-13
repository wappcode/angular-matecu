import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatecuFileInput, FileInputState } from './matecu-file-input';

describe('MatecuFileInput', () => {
  let component: MatecuFileInput;
  let fixture: ComponentFixture<MatecuFileInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatecuFileInput],
    }).compileComponents();

    fixture = TestBed.createComponent(MatecuFileInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.multiple).toBeFalse();
    expect(component.maxFiles).toBe(1);
    expect(component.enableDragDrop).toBeTrue();
    expect(component.showPreview).toBeFalse();
    expect(component.currentState).toBe(FileInputState.IDLE);
    expect(component.files).toEqual([]);
    expect(component.validationErrors).toEqual([]);
  });

  describe('File Validation', () => {
    it('should validate file size correctly', () => {
      component.maxFileSize = 1024; // 1KB
      const largeFile = new File(['x'.repeat(2048)], 'large.txt', { type: 'text/plain' });
      const smallFile = new File(['small'], 'small.txt', { type: 'text/plain' });

      let result = component['validateFile'](largeFile);
      expect(result.isValid).toBeFalse();
      expect(result.errors).toContain(component.errorMessages.invalidSize);

      result = component['validateFile'](smallFile);
      expect(result.isValid).toBeTrue();
      expect(result.errors).toEqual([]);
    });

    it('should validate MIME types correctly', () => {
      component.acceptedMimeTypes = ['image/jpeg', 'image/png'];
      const validFile = new File(['image'], 'image.jpg', { type: 'image/jpeg' });
      const invalidFile = new File(['text'], 'doc.txt', { type: 'text/plain' });

      let result = component['validateFile'](validFile);
      expect(result.isValid).toBeTrue();

      result = component['validateFile'](invalidFile);
      expect(result.isValid).toBeFalse();
      expect(result.errors).toContain(component.errorMessages.invalidType);
    });

    it('should validate file extensions correctly', () => {
      component.acceptedExtensions = ['.jpg', '.png'];
      const validFile = new File(['image'], 'image.jpg', { type: 'image/jpeg' });
      const invalidFile = new File(['text'], 'doc.txt', { type: 'text/plain' });

      let result = component['validateFile'](validFile);
      expect(result.isValid).toBeTrue();

      result = component['validateFile'](invalidFile);
      expect(result.isValid).toBeFalse();
    });
  });

  describe('Single File Mode', () => {
    beforeEach(() => {
      component.multiple = false;
    });

    it('should handle single file selection', () => {
      spyOn(component.fileSelected, 'emit');
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });

      component['handleSingleFile'](file);

      expect(component.file).toBe(file);
      expect(component.fileName).toBe('test.txt');
      expect(component.selectedFileSize).toBeGreaterThan(0);
    });

    it('should use display name when provided', () => {
      component.displayName = 'Custom Name';
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });

      component['handleSingleFile'](file);

      expect(component.fileName).toBe('Custom Name');
    });

    it('should remove file correctly', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      component.file = file;
      spyOn(component.fileRemoved, 'emit');
      spyOn(component, 'resetComponent').and.callThrough();
      spyOn(component, 'notifyChange').and.callThrough();

      component.removeFile(file);

      expect(component.fileRemoved.emit).toHaveBeenCalledWith(file);
      expect(component.resetComponent).toHaveBeenCalled();
      expect(component.notifyChange).toHaveBeenCalledWith(null);
    });
  });

  describe('Multiple Files Mode', () => {
    beforeEach(() => {
      component.multiple = true;
      component.maxFiles = 3;
    });

    it('should handle multiple file selection', () => {
      const files = [
        new File(['content1'], 'test1.txt', { type: 'text/plain' }),
        new File(['content2'], 'test2.txt', { type: 'text/plain' }),
      ];

      component['handleMultipleFiles'](files);

      expect(component.files).toEqual(files);
      expect(component.file).toBe(files[0]);
      expect(component.fileName).toContain('2 archivo(s)');
    });

    it('should validate max files limit', async () => {
      const files = [
        new File(['1'], 'test1.txt', { type: 'text/plain' }),
        new File(['2'], 'test2.txt', { type: 'text/plain' }),
        new File(['3'], 'test3.txt', { type: 'text/plain' }),
        new File(['4'], 'test4.txt', { type: 'text/plain' }), // Exceeds limit
      ];

      await component['handleFileSelection'](files);

      expect(component.validationErrors).toContain(component.errorMessages.tooManyFiles);
      expect(component.currentState).toBe(FileInputState.ERROR);
    });

    it('should remove specific file from multiple selection', () => {
      const file1 = new File(['1'], 'test1.txt', { type: 'text/plain' });
      const file2 = new File(['2'], 'test2.txt', { type: 'text/plain' });
      component.files = [file1, file2];

      spyOn(component.filesSelected, 'emit');
      spyOn(component.fileRemoved, 'emit');

      component.removeFile(file1);

      expect(component.files).toEqual([file2]);
      expect(component.filesSelected.emit).toHaveBeenCalledWith([file2]);
      expect(component.fileRemoved.emit).toHaveBeenCalledWith(file1);
    });
  });

  describe('Drag and Drop', () => {
    let dragEvent: DragEvent;

    beforeEach(() => {
      dragEvent = new DragEvent('dragover');
      Object.defineProperty(dragEvent, 'dataTransfer', {
        value: {
          files: [new File(['test'], 'test.txt', { type: 'text/plain' })],
        },
      });
      component.enableDragDrop = true;
    });

    it('should handle drag over event', () => {
      spyOn(dragEvent, 'preventDefault');
      spyOn(component.dragEnter, 'emit');

      component.onDragOver(dragEvent);

      expect(dragEvent.preventDefault).toHaveBeenCalled();
      expect(component.isDragOver).toBeTrue();
      expect(component.dragEnter.emit).toHaveBeenCalledWith(dragEvent);
    });

    it('should handle drag leave event', () => {
      component.isDragOver = true;
      spyOn(component.dragLeave, 'emit');

      component.onDragLeave(dragEvent);

      expect(component.isDragOver).toBeFalse();
      expect(component.dragLeave.emit).toHaveBeenCalledWith(dragEvent);
    });

    it('should handle drop event', () => {
      spyOn(dragEvent, 'preventDefault');
      spyOn(component, 'handleFileSelection').and.returnValue(Promise.resolve());

      component.onDrop(dragEvent);

      expect(dragEvent.preventDefault).toHaveBeenCalled();
      expect(component.isDragOver).toBeFalse();
      expect(component.handleFileSelection).toHaveBeenCalled();
    });

    it('should ignore drag events when disabled', () => {
      component.enableDragDrop = false;
      spyOn(dragEvent, 'preventDefault');

      component.onDragOver(dragEvent);

      expect(dragEvent.preventDefault).not.toHaveBeenCalled();
      expect(component.isDragOver).toBeFalse();
    });
  });

  describe('File Icon and Preview', () => {
    it('should return correct icon for different file types', () => {
      const imageFile = new File([''], 'image.jpg', { type: 'image/jpeg' });
      const pdfFile = new File([''], 'document.pdf', { type: 'application/pdf' });
      const unknownFile = new File([''], 'file.xyz', { type: 'unknown/type' });

      expect(component.getFileIcon(imageFile)).toBe('🖼️');
      expect(component.getFileIcon(pdfFile)).toBe('📄');
      expect(component.getFileIcon(unknownFile)).toBe('📄');
    });

    it('should generate preview URL for images', () => {
      spyOn(URL, 'createObjectURL').and.returnValue('blob:test-url');
      const imageFile = new File([''], 'image.jpg', { type: 'image/jpeg' });

      const previewUrl = component.getPreviewUrl(imageFile);

      expect(URL.createObjectURL).toHaveBeenCalledWith(imageFile);
      expect(previewUrl).toBe('blob:test-url');
    });

    it('should cache preview URLs', () => {
      spyOn(URL, 'createObjectURL').and.returnValue('blob:test-url');
      const imageFile = new File([''], 'image.jpg', { type: 'image/jpeg' });

      const url1 = component.getPreviewUrl(imageFile);
      const url2 = component.getPreviewUrl(imageFile);

      expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
      expect(url1).toBe(url2);
    });
  });

  describe('State Management', () => {
    it('should emit state changes', () => {
      spyOn(component.stateChange, 'emit');

      component['changeState'](FileInputState.LOADING);

      expect(component.currentState).toBe(FileInputState.LOADING);
      expect(component.stateChange.emit).toHaveBeenCalledWith(FileInputState.LOADING);
    });

    it('should not emit same state twice', () => {
      component.currentState = FileInputState.LOADING;
      spyOn(component.stateChange, 'emit');

      component['changeState'](FileInputState.LOADING);

      expect(component.stateChange.emit).not.toHaveBeenCalled();
    });

    it('should return correct computed properties', () => {
      component.validationErrors = ['error'];
      component.currentState = FileInputState.ERROR;
      component.files = [new File([''], 'test.txt')];

      expect(component.hasErrors).toBeTrue();
      expect(component.isLoading).toBeFalse();
      expect(component.hasFiles).toBeTrue();
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write single file value', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      spyOn(component, 'handleSingleFile').and.callThrough();

      component.writeValue(file);

      expect(component.handleSingleFile).toHaveBeenCalledWith(file);
    });

    it('should write multiple files value', () => {
      const files = [new File(['1'], 'test1.txt'), new File(['2'], 'test2.txt')];
      spyOn(component, 'handleMultipleFiles').and.callThrough();

      component.writeValue(files);

      expect(component.handleMultipleFiles).toHaveBeenCalledWith(files);
    });

    it('should register change and touched callbacks', () => {
      const changeFn = jasmine.createSpy();
      const touchedFn = jasmine.createSpy();

      component.registerOnChange(changeFn);
      component.registerOnTouched(touchedFn);

      expect(component['onChange']).toBe(changeFn);
      expect(component['onTouched']).toBe(touchedFn);
    });
  });

  describe('Memory Management', () => {
    it('should cleanup preview URLs on destroy', () => {
      spyOn(URL, 'revokeObjectURL');
      component.previewUrl = 'blob:test-url';
      component.previewUrls.set('key1', 'blob:url1');
      component.previewUrls.set('key2', 'blob:url2');

      component.ngOnDestroy();

      expect(URL.revokeObjectURL).toHaveBeenCalledTimes(3);
      expect(component.previewUrls.size).toBe(0);
    });

    it('should cleanup preview URL when removing file', () => {
      spyOn(URL, 'revokeObjectURL');
      const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
      component.previewUrls.set(fileKey, 'blob:test-url');

      component.removeFile(file);

      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test-url');
      expect(component.previewUrls.has(fileKey)).toBeFalse();
    });
  });
});
