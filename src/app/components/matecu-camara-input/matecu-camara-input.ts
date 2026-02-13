import { Component } from '@angular/core';
import { MatecuCameraInput } from '.../../../projects/angular-matecu/src/lib/components/matecu-camera-input/matecu-camera-input';

@Component({
  selector: 'app-matecu-camara-input',
  imports: [MatecuCameraInput],
  templateUrl: './matecu-camara-input.html',
  styleUrls: ['./matecu-camara-input.scss'],
})
export class MatecuCamaraInput {
  placeholder = 'Select or capture a photo';
  cameraButtonText = 'Open Camera';
  galleryButtonText = 'Choose from Gallery';
  closeButtonText = 'Close';
  captureButtonText = 'Capture';
  loadingText = 'Loading camera...';
  enableCameraCapture = true;
  enableGalleryPicker = true;
  isDisabled = false;

  onPhotoCaptured(photo: Blob) {
    console.log('Photo captured:', photo);
    // Handle the captured photo (e.g., upload or display it)
  }

  onPhotoSelected(photo: File) {
    console.log('Photo selected from gallery:', photo);
    // Handle the selected photo (e.g., upload or display it)
  }

  onError(error: any) {
    console.error('Camera input error:', error);
    // Handle errors (e.g., show a notification to the user)
  }
}
