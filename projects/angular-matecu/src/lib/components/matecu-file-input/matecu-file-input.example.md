# MatecuFileInput - Ejemplos de Uso

## Uso Básico

### Archivo Simple

```html
<matecu-file-input
  [(ngModel)]="selectedFile"
  [maxFileSize]="5242880"
  [acceptedMimeTypes]="['image/*', 'application/pdf']"
  (fileSelected)="onFileSelected($event)"
>
</matecu-file-input>
```

### Múltiples Archivos

```html
<matecu-file-input
  [(ngModel)]="selectedFiles"
  [multiple]="true"
  [maxFiles]="5"
  [maxFileSize]="10485760"
  [showPreview]="true"
  [acceptedExtensions]="['.jpg', '.png', '.pdf', '.docx']"
  (filesSelected)="onFilesSelected($event)"
>
</matecu-file-input>
```

## Configuraciones Avanzadas

### Con Drag & Drop y Preview

```html
<matecu-file-input
  [(ngModel)]="imageFiles"
  [multiple]="true"
  [maxFiles]="10"
  [enableDragDrop]="true"
  [showPreview]="true"
  [previewMaxWidth]="150"
  [previewMaxHeight]="150"
  [acceptedMimeTypes]="['image/jpeg', 'image/png', 'image/webp']"
  [placeholder]="'Arrastra tus imágenes aquí o haz clic para seleccionar'"
  [buttonText]="'Seleccionar Imágenes'"
  (dragEnter)="onDragEnter($event)"
  (dragLeave)="onDragLeave($event)"
  (fileSelected)="onImageSelected($event)"
>
</matecu-file-input>
```

### Con Optimización de Imágenes

```html
<matecu-file-input
  [(ngModel)]="optimizedImage"
  [optimizeImage]="optimizeImageFunction"
  [optimizeImageToSize]="800"
  [acceptedMimeTypes]="['image/*']"
  [showFileSize]="true"
  [displayName]="'Imagen optimizada'"
>
</matecu-file-input>
```

### Con Formato de Tamaño Personalizado

```html
<!-- Mostrar siempre en KB -->
<matecu-file-input [(ngModel)]="file" [showFileSize]="true" [fileSizeUnit]="'KB'">
</matecu-file-input>

<!-- Mostrar siempre en MB -->
<matecu-file-input [(ngModel)]="file" [showFileSize]="true" [fileSizeUnit]="'MB'">
</matecu-file-input>

<!-- Automático (predeterminado) - mejor unidad según tamaño -->
<matecu-file-input [(ngModel)]="file" [showFileSize]="true" [fileSizeUnit]="'AUTO'">
</matecu-file-input>
```

### Con Mensajes de Error Personalizados

```html
<matecu-file-input
  [(ngModel)]="document"
  [maxFileSize]="2097152"
  [acceptedExtensions]="['.pdf', '.doc', '.docx']"
  [errorMessages]="{
    invalidSize: 'El documento no puede superar 2MB',
    invalidType: 'Solo se permiten archivos PDF y Word',
    uploadError: 'Error al procesar el documento'
  }"
  (validationError)="onValidationError($event)"
>
</matecu-file-input>
```

## Implementación en Componente TypeScript

```typescript
import { Component } from '@angular/core';
import { MatecuFileInput, FileInputState, FileSizeUnit } from 'angular-matecu';

@Component({
  selector: 'app-file-upload',
  template: `
    <matecu-file-input
      [(ngModel)]="selectedFiles"
      [multiple]="true"
      [maxFiles]="3"
      [maxFileSize]="maxSize"
      [showPreview]="true"
      [showFileSize]="true"
      [enableDragDrop]="true"
      [acceptedMimeTypes]="allowedTypes"
      (filesSelected)="onFilesSelected($event)"
      (validationError)="onError($event)"
      (stateChange)="onStateChange($event)"
    ></matecu-file-input>

    <div *ngIf="isProcessing">Procesando archivos...</div>
  `,
})
export class FileUploadComponent {
  selectedFiles: File[] = [];
  maxSize = 5 * 1024 * 1024; // 5MB
  allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  isProcessing = false;
  sizeUnit: FileSizeUnit = 'AUTO'; // Nueva propiedad para controlar la unidad

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
```

## Propiedades Disponibles

### Inputs

- `multiple`: Permite selección múltiple
- `maxFiles`: Número máximo de archivos (para múltiple)
- `maxFileSize`: Tamaño máximo en bytes
- `acceptedMimeTypes`: Tipos MIME permitidos
- `acceptedExtensions`: Extensiones permitidas
- `enableDragDrop`: Habilita drag & drop
- `showPreview`: Muestra preview de imágenes
- `showFileSize`: Muestra tamaño del archivo
- `fileSizeUnit`: Unidad para mostrar tamaño ('AUTO' | 'bytes' | 'KB' | 'MB' | 'GB' | 'TB')
- `displayName`: Nombre personalizado a mostrar
- `placeholder`: Texto cuando no hay archivos
- `buttonText`: Texto del botón de selección
- `optimizeImage`: Función para optimizar imágenes
- `errorMessages`: Mensajes de error personalizados

### Outputs

- `fileSelected`: Emite cuando se selecciona un archivo
- `filesSelected`: Emite cuando se seleccionan múltiples archivos
- `fileRemoved`: Emite cuando se elimina un archivo
- `validationError`: Emite errores de validación
- `stateChange`: Emite cambios de estado
- `dragEnter`: Emite cuando se inicia drag
- `dragLeave`: Emite cuando se termina drag

### Estados

- `IDLE`: Estado inicial
- `LOADING`: Procesando archivos
- `SUCCESS`: Archivos procesados exitosamente
- `ERROR`: Error en validación o procesamiento
