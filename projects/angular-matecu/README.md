# Angular-Matecu

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Librería con componentes y utilidades para el desarrollo de aplicaciones Angular con Material Design.

## Tabla de Contenido

- [Instalación](#instalación)
- [Componentes de Indicadores](#componentes-de-indicadores)
  - [matecu-spinner](#matecu-spinner-componente)
- [Componentes de Alertas](#componentes-de-alertas)
  - [matecu-alert-box](#matecu-alert-box-componente)
  - [matecu-alert-dialog](#matecu-alert-dialog-componente)
  - [MatecuSnackBarService](#matecusnackbarservice)
- [Componentes de Entrada (Inputs)](#componentes-de-entrada-inputs)
  - [matecu-autocomplete](#matecu-autocomplete-componente)
  - [matecu-autocomplete-multiple](#matecu-autocomplete-multiple-componente)
  - [matecu-file-input](#matecu-file-input-componente)
- [Componentes de Layout](#componentes-de-layout)
  - [MatecuTopbarLayout](#matecutopbarlayout)

## Instalación

```bash
npm install angular-matecu
```

Para versiones de Angular menores a 15 utilizar la versión ^2.0

```bash
npm install angular-matecu@^2.0
```

Ver [CHANGELOG](CHANGELOG.md)

## Componentes de Indicadores

## matecu-spinner (Componente)

Componente que genera un spinner que se puede utilizar para indicar que la app esta realizando algún proceso

### Uso:

Importar componente o módulo

```typescript
import { MatecuSpinnerComponent } from 'angular-matecu';
```

Agregar a la plantilla de algún componente

```html
<matecu-spinner active="true" color="'red'" size="'30px'"></matecu-spinner>
<matecu-spinner global="true" color="'orange'"></matecu-spinner>
```

Propiedades:

- active: (boolean) True muestra el spinner, False lo oculta
- color: (string) Color del spinner
- size: (string) Tamaño del spinner
- global: (boolean) True indica que el cambio de visible a oculto será aplicado utilizando el servicio del spinner y aplicará a todos los que tengan asignada esta propiedad como True sin importar el valor asignado a "active"

## MatecuSpinnerService

### Uso:

```typescript
// import { MatecuSpinnerService } from 'angular-matecu';
// ...
key: string;
constructor(private spinnerService: MatecuSpinnerService) {}
// ...
// mostrar el spinner
show() {
    this.key = this.spinnerService.add();
}
// ocultar el spinner
hide() {
    this.spinnerService.remove(this.key);
}
```

Métodos:

- watch: Retorna un observable boolean indicando si el spinner esta activo. El espinner se mantendrá activo mientras haya elementos en la lista de claves del servico. No es necesario usar este método, el componente spinner lo usa de forma transparente.

- add: Crea y agrega una clave en la lista del servico. Se puede pasar como parámetro una clave personalizada.

- remove: Elimina de la lista del servicio las claves que sean igual a la clave pasada como parámetro

- clear: Elimina todas las claves forzando a que el spinner pase al estado inactivo.

## Componentes de Alertas

## matecu-alert-box (Componente)

### Uso:

Importar componente o módulo

```typescript
import { MatecuAlertBoxComponent } from 'angular-matecu';
```

Agregar a la plantilla de algún componente

```html
<matecu-alert-box color="success"> Alerta Success </matecu-alert-box>
```

**Colores disponibles:** `warning` | `danger` | `success` | `info`

## matecu-alert-dialog (Componente)

Diálogo de alerta o confirmación

### Uso:

Importar módulo

En el componente

```typescript
import { MatDialog } from '@angular/material/dialog';
import { MatecuAlertDialogComponent, MatecuAlertBoxType } from 'angular-matecu';
import { filter } from 'rxjs/operators';

// ....
constructor(private dialog: MatDialog) {}

openBasicDialog(): void {
  const message = 'Mensaje a mostrar';
  const type = 'warning'; // warning, danger, success, info
  const icon = true
  const dismissText = 'Cancelar'; // texto del botón para cerrar el diálogo (opcional)
  const action = 'Confirmar'; // texto del botón para activar la acción principal del diálogo (opcional)
  const title = 'Título del diálogo';
  const dialogRef = this.dialog.open(MatecuAlertDialogComponent, {
    data: { message, type, icon, dismissText, action, title },
  });
  // afterClosed retorna un valor boolean o null que se puede utilizar para determinar si se va a ejecutar alguna acción
  dialogRef.afterClosed().pipe(
    filter(execAction => !!execAction)
  ).subscribe();
}
```

## MatecuSnackBarService

Servicio para abrir diálogos snackBar con títulos con colores para Error, Success, Warning, Info

### Uso

Importar en el módulo MatecuAlertBoxModule en app.module

```typescript
import { MatecuAlertBoxModule } from 'angular-matecu';

@NgModule({
  imports: [
    ...
    MatecuAlertBoxModule
    ...
  ],
  ...
})
export class AppModule { }
```

En el componente

```typescript
import { MatecuSnackBarService } from 'angular-matecu';

// ....
constructor(private snackBar: MatecuSnackBarService) { }

openError(): void {
     this.snackBar.openError('Mensaje de error');
}
```

### Métodos

- `openError()`
- `openInfo()`
- `openWarning()`
- `openSuccess()`
- `open()`
- `dismiss()`

## Componentes de Entrada (Inputs)

## matecu-autocomplete (Componente)

Componente de autocompletado simple que permite buscar y seleccionar una opción de una lista.

### Uso:

Importar componente

```typescript
import { MatecuAutocomplete } from 'angular-matecu';
```

Agregar a la plantilla

```html
<matecu-autocomplete
  [options]="options"
  placeholder="Buscar..."
  [allowCreate]="false"
  [loading]="false"
  [readonly]="false"
  (searchChange)="onSearchChange($event)"
  [(ngModel)]="selectedValue"
>
</matecu-autocomplete>
```

### Propiedades:

- `options`: Array de opciones tipo `[value, label][]`
- `allowCreate`: Permite crear nuevas opciones sobre la marcha
- `loading`: Muestra indicador de carga
- `readonly`: Modo de solo lectura
- `filterFn`: Función personalizada para filtrar opciones
- `searchChangeDebounceTime`: Tiempo de debounce para búsqueda (default: 300ms)
- `placeholder`: Texto de placeholder
- `required`: Campo obligatorio
- `disabled`: Campo deshabilitado

### Eventos:

- `searchChange`: Se emite cuando cambia el texto de búsqueda

## matecu-autocomplete-multiple (Componente)

Componente de autocompletado que permite seleccionar múltiples opciones con chips y reordenamiento por drag & drop.

### Uso:

```typescript
import { MatecuAutocompleteMultiple } from 'angular-matecu';
```

```html
<matecu-autocomplete-multiple
  [options]="options"
  placeholder="Seleccionar opciones..."
  [enableSelectAll]="true"
  [showTooltip]="true"
  [readonly]="false"
  [loading]="false"
  selectAllLabel="Seleccionar Todo"
  clearAllLabel="Limpiar Todo"
  (searchChange)="onSearchChange($event)"
  [(ngModel)]="selectedValues"
>
</matecu-autocomplete-multiple>
```

### Propiedades:

- `options`: Array de opciones tipo `[value, label][]`
- `enableSelectAll`: Habilita botones de "Seleccionar Todo" y "Limpiar Todo"
- `showTooltip`: Muestra tooltip con el texto completo en chips largos
- `selectAllLabel`: Texto del botón "Seleccionar Todo"
- `clearAllLabel`: Texto del botón "Limpiar Todo"
- `filterFn`: Función personalizada para filtrar opciones
- `searchChangeDebounceTime`: Tiempo de debounce para búsqueda (default: 300ms)
- `placeholder`: Texto de placeholder
- `loading`: Muestra indicador de carga
- `readonly`: Modo de solo lectura

### Eventos:

- `searchChange`: Se emite cuando cambia el texto de búsqueda

### Funcionalidades:

- **Drag & Drop**: Los chips seleccionados se pueden reordenar arrastrando
- **Virtual Scrolling**: Optimizado para listas grandes de opciones
- **Select All/Clear All**: Botones para seleccionar o limpiar todas las opciones
- **Tooltips**: Muestra el texto completo cuando el chip es muy largo

## matecu-file-input (Componente)

Componente avanzado para carga de archivos con validaciones, preview, drag & drop y optimización de imágenes.

### Uso:

```typescript
import { MatecuFileInput } from 'angular-matecu';
```

```html
<matecu-file-input
  [multiple]="false"
  [maxFiles]="1"
  [maxFileSize]="5242880"
  [acceptedMimeTypes]="['image/jpeg', 'image/png']"
  [acceptedExtensions]="['.jpg', '.png']"
  [showPreview]="true"
  [enableDragDrop]="true"
  [showFileSize]="true"
  placeholder="Selecciona un archivo o arrastra aquí"
  buttonText="Seleccionar archivo"
  (fileSelect)="onFileSelect($event)"
  (fileRemove)="onFileRemove($event)"
  [(ngModel)]="selectedFiles"
>
</matecu-file-input>
```

### Propiedades de Validación:

- `maxFileSize`: Tamaño máximo de archivo en bytes
- `maxFiles`: Número máximo de archivos permitidos
- `acceptedMimeTypes`: Array de tipos MIME permitidos
- `acceptedExtensions`: Array de extensiones de archivo permitidas

### Propiedades de Funcionalidad:

- `multiple`: Permite selección múltiple de archivos
- `enableDragDrop`: Habilita funcionalidad de drag & drop
- `showPreview`: Muestra preview de imágenes
- `showFileSize`: Muestra el tamaño de los archivos
- `fileSizeUnit`: Unidad para mostrar tamaño ('AUTO', 'bytes', 'KB', 'MB', 'GB', 'TB')

### Propiedades de UI:

- `placeholder`: Texto cuando no hay archivos seleccionados
- `buttonText`: Texto del botón de selección
- `changeSelectedFileText`: Texto del botón para cambiar archivo
- `loadingText`: Texto durante procesamiento
- `previewMaxWidth`/`previewMaxHeight`: Tamaño máximo del preview

### Optimización de Imágenes:

```typescript
// Función personalizada de optimización
optimizeImage = async (file: File): Promise<File> => {
  // Tu lógica de optimización
  return optimizedFile;
};
```

```html
<matecu-file-input [optimizeImage]="optimizeImage" [optimizeImageToSize]="1024000">
</matecu-file-input>
```

### Eventos:

- `fileSelect`: Se emite cuando se seleccionan archivos
- `fileRemove`: Se emite cuando se remueve un archivo
- `validationError`: Se emite cuando hay errores de validación

### Estados del Componente:

- `IDLE`: Estado inicial
- `LOADING`: Procesando archivos
- `SUCCESS`: Archivos procesados correctamente
- `ERROR`: Error en procesamiento

## Componentes de Layout

## MatecuTopbarLayout

Crea la estructura para una página que contiene un topbar en posición fija a la que se le pueden agregar botones de acciones, título y buscador.

El contenido de la página tiene una función que se puede llamar para realizar un desplazamiento hacia arriba.

### Ejemplo básico

Importar módulo o componentes

```typescript
// ...
import { MatecuTopbarLayoutModule } from 'angular-matecu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// Se pueden importar los componentes de forma individual
// ...
@NgModule({
  declarations: [AppComponent],
  imports: [
    // ...
    MatecuTopbarLayoutModule,
    MatIconModule,
    MatButtonModule,
    // ...
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Agregar a la plantilla de algún componente:

```html
<matecu-topbar-layout #topbar>
  <matecu-topbar-header-row first-row>
    <matecu-topbar-header-column left-column>
      <matecu-topbar-action>
        <button mat-icon-button><mat-icon>menu</mat-icon></button>
      </matecu-topbar-action>
      <matecu-topbar-fab>
        <button mat-fab><mat-icon>add</mat-icon></button>
      </matecu-topbar-fab>
      <matecu-topbar-title>Topbar Layout</matecu-topbar-title>
    </matecu-topbar-header-column>
    <matecu-topbar-header-column right-column>
      <matecu-topbar-search
        placeholder="Buscar..."
        (valueChange)="searchFunction($event)"
      ></matecu-topbar-search>
      <matecu-topbar-action>
        <button mat-icon-button><mat-icon>more_vert</mat-icon></button>
      </matecu-topbar-action>
    </matecu-topbar-header-column>
  </matecu-topbar-header-row>
  <matecu-topbar-body>
    Contenido de la página .....
    <button (click)="topbar.scrollTop()">Regresar al inicio</button>
  </matecu-topbar-body>
</matecu-topbar-layout>
```

Agregar al componente el método para capturar el texto de búsqueda

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchFunction(searchText: string) {
    console.log(searchText);
  }
}
```

Ajustar los colores y los estilos en el archivo de css del componente o el archivo de css global

```scss
// global
:root {
  // ...
  --mtb-primary-color: red;
  // ...
}

// en el componente
:host {
  // ...
  --mtb-primary-color: red;
  // ...
}
```

## Componentes

### MatecuTopbarLayout:

Componente principal

#### Variables de estilos

- --mtb-border : Borde
- --mtb-margin : Margen
- --mtb-width : Ancho
- --mtb-height : Alto
- --mtb-primary-color : Color principal (Color de la barra)
- --mtb-bar-height : Alto de la barra
- --mtb-bar-prominent-height : Alto de la barra en modo prominente

### Inputs

- prominent : Valor boolean que indica si la barra es prominente
- mobileWidth: Valor numérico que indica el ancho máximo que debe considerarse para aplicar estilos para dispositivos móviles
- mobileStyle: Indica si se deben aplicar estilos para dispositivos móviles

### Outputs

- mobileStyleChange: Propiedad que se actualiza cuando se redimensiona el componente y se calcula utilizando el valor de mobileWidth. Indica si se deben aplicar estilos para dispositivos móviles
- whenResize: Evento que se emite cuando se redimensiona el componente y retorna el nuevo valor del ancho.

### Métodos

- scrollTop: Función que se puede llamar desde el componente padre y hace scroll del contenido hacia la parte superior

### MatecuTopbarHeaderRow

Crea una fila para agregar contenido en el encabezado, pueden agregarse hasta 2 filas y es necesario agregar alguno de los siguientes atributos `first-row`, `second-row`

#### Variables de estilos

- `--mtb-row-padding`
- `--mtb-row-margin`
- `--mtb-row-width`

### MatecuTopbarHeaderColumn

Crea una columna para agregar contenido a una fila del encabezado es necesario agregar alguno de los siguientes atributos `left-column`, `right-column`

### MatecuTopbarAction

Crea un contenedor para agregar acciones como links o botones preferentemente en formato de iconos

#### Variables de estilos

- `--mtb-action-padding`
- `--mtb-action-margin`

### MatecuTopbarFab

Crea un contenedor para agregar un botón (FAB)

#### Variables de estilos

- `--mtb-fab-mobile-bottom-position`: Posición relativa a la parte inferior del componente principal que se aplica cuando están activos los estilos para dispositivos móviles.
- `--mtb-fab-mobile-right-position`: Posición relativa a la parte inferior del componente MatecuTopbarLayout

#### Inputs

- `mobileStyle`: Valor booleano que indica si se ajustan los estilos para dispositivos móviles
- `display`: Valor boolean que indica si se debe mostrar el componente

### MatecuTopbarSearch

Crea un campo de texto para hacer búsquedas

#### Inputs

- `value`: Especifica el valor de la búsqueda
- `mobileStyle`: Valor booleano que indica si se ajustan los estilos para dispositivos móviles
- `placeholder`: Valor del Placeholder del campo de búsqueda
- `display`: Valor boolean que indica si se debe mostrar el componente

#### Outputs

- `valueChanges`: Emite un evento con el valor del texto ingresado en el campo de búsqueda

### MatecuTopbarTitle

Crea un contenedor para agregar un título a la página.

#### Variables de estilos

- `--mtb-title-padding`
- `--mtb-title-margin`

### MatecuTopbarBody

Crea un contenedor para agregar el contenido de la página

#### Variables de estilos

- `--mtb-body-padding`: Padding para el contenido
- `--mtb-body-background`: Fondo del contenido
- `--mtb-body-padding-button`: Padding inferior (Es utilizado para asignar un espacio al Botón principal (FAB) cuando tiene asignados los estilos para dispositivos móviles)

```

```
