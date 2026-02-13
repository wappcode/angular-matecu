import { Component } from '@angular/core';
import {
  MatecuFileInput,
  FileInputState,
} from '../../../../projects/angular-matecu/src/lib/components/matecu-file-input/matecu-file-input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-input',
  imports: [MatecuFileInput, FormsModule, CommonModule],
  templateUrl: './file-input.html',
  styleUrl: './file-input.scss',
})
export class FileInput {
  selectedFiles: File[] = [];
  maxSize = 5 * 1024 * 1024; // 5MB
  allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  isProcessing = false;

  onFilesSelected(files: File[]) {
    console.log('Archivos seleccionados:', files);
    // Procesar archivos...
  }

  onError(errors: string[]) {
    console.error('Errores de validación:', errors);
    // Mostrar errores al usuario...
  }

  onStateChange(state: FileInputState) {
    this.isProcessing = state === FileInputState.LOADING;
    console.log('Estado cambiado a:', state);
  }

  // Función para optimizar imágenes
  optimizeImageFunction = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calcular nuevas dimensiones manteniendo aspecto
        const maxSize = 800;
        const ratio = Math.min(maxSize / img.width, maxSize / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Dibujar imagen redimensionada
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convertir a blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const optimizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(optimizedFile);
            } else {
              resolve(file);
            }
          },
          file.type,
          0.85, // Calidad de compresión
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };
}
