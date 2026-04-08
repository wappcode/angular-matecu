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
  - [matecu-datetime-picker](#matecu-datetime-picker-componente)
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
  [deselectOption]="true"
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
- `deselectOption`: (boolean) Permite deseleccionar automáticamente las opciones después de ser seleccionadas (default: false)
- `placeholder`: Texto de placeholder
- `required`: Campo obligatorio
- `disabled`: Campo deshabilitado

### ViewChild - autocompleteTrigger:

El componente expone una referencia al `MatAutocompleteTrigger` que permite control programático del autocomplete:

```typescript
import { MatecuAutocomplete } from 'angular-matecu';
import { ViewChild } from '@angular/core';

export class MyComponent {
  @ViewChild(MatecuAutocomplete) autocomplete!: MatecuAutocomplete;

  // Abrir el panel programáticamente
  openPanel() {
    this.autocomplete.autocompleteTrigger.openPanel();
  }

  // Cerrar el panel programáticamente
  closePanel() {
    this.autocomplete.autocompleteTrigger.closePanel();
  }

  // Verificar si el panel está abierto
  isPanelOpen(): boolean {
    return this.autocomplete.autocompleteTrigger.panelOpen;
  }
}
```

### Uso de deselectOption:

La propiedad `deselectOption` es útil cuando necesitas permitir que los usuarios seleccionen la misma opción múltiples veces o cuando quieres que la opción no permanezca seleccionada visualmente:

```html
<!-- Permite reseleccionar la misma opción -->
<matecu-autocomplete
  [options]="actions"
  [deselectOption]="true"
  placeholder="Selecciona una acción..."
  (valueChange)="executeAction($event)"
>
</matecu-autocomplete>
```

```typescript
export class MyComponent {
  actions = [
    ['refresh', 'Actualizar datos'],
    ['export', 'Exportar reporte'],
    ['send', 'Enviar notificación'],
  ];

  executeAction(action: string | null) {
    if (action) {
      console.log('Ejecutando acción:', action);
      // La opción se deseleccionará automáticamente permitiendo reselección
    }
  }
}
```

### Eventos:

- `searchChange`: Se emite cuando cambia el texto de búsqueda

## matecu-autocomplete-multiple (Componente)

Componente de autocompletado que permite seleccionar múltiples opciones con chips y controles para seleccionar/limpiar todo.

### Uso:

Importar componente:

```typescript
import { MatecuAutocompleteMultiple } from 'angular-matecu';
```

### Uso Básico:

```html
<mat-form-field appearance="outline">
  <mat-label>Seleccionar países</mat-label>
  <matecu-autocomplete-multiple
    [options]="countries"
    placeholder="Buscar países..."
    [loading]="false"
    [readonly]="false"
    [showTooltip]="true"
    [allowCreate]="false"
    (searchChange)="onSearchChange($event)"
    (valueChange)="onValueChange($event)"
    [(ngModel)]="selectedValues"
  >
  </matecu-autocomplete-multiple>
</mat-form-field>
```

### Uso con Botones de Control Externo:

```html
<mat-form-field appearance="outline">
  <mat-label>Countries</mat-label>
  <matecu-autocomplete-multiple
    placeholder="Seleccionar países"
    [formControl]="countriesControl"
    [options]="countries"
    [showTooltip]="true"
  ></matecu-autocomplete-multiple>

  <div matSuffix class="suffix-top">
    <button mat-icon-button (click)="selectAll()" title="Seleccionar todo">
      <mat-icon>select_all</mat-icon>
    </button>
    <button mat-icon-button (click)="clearAll()" title="Limpiar todo">
      <mat-icon>clear</mat-icon>
    </button>
  </div>
</mat-form-field>
```

### Componente TypeScript:

```typescript
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatecuAutocompleteMultiple } from 'angular-matecu';

export class MyComponent {
  countriesControl = new FormControl<string[]>([]);

  countries: [string, string][] = [
    ['us', 'United States'],
    ['mx', 'Mexico'],
    ['ca', 'Canada'],
    ['br', 'Brazil'],
    ['ar', 'Argentina'],
    ['fr', 'France'],
    ['de', 'Germany'],
    ['it', 'Italy'],
    ['es', 'Spain'],
    ['jp', 'Japan'],
    // ... más países
  ];

  @ViewChild(MatecuAutocompleteMultiple)
  matecuAutocompleteMultiple!: MatecuAutocompleteMultiple;

  selectAll() {
    this.matecuAutocompleteMultiple.selectAll();
  }

  clearAll() {
    this.matecuAutocompleteMultiple.clearAll();
  }

  onSearchChange(searchText: string | undefined | null) {
    console.log('Búsqueda:', searchText);
    // Aquí puedes implementar lógica para carga dinámica de opciones
  }

  onValueChange(values: string[] | null) {
    console.log('Valores seleccionados:', values);
  }
}
```

### Estilos CSS para Botones de Control:

Para posicionar correctamente los botones de "Seleccionar Todo" y "Limpiar Todo", agrega estos estilos:

```scss
:host {
  display: block;

  .suffix-top {
    align-self: flex-start !important;
    margin-top: 4px; /* Ajuste para que no toque el borde superior */
    display: flex;
    flex-direction: column; /* Apila los botones verticalmente */
    align-items: center;
  }
}

// Ajuste global para posicionar el sufijo en la parte superior
::ng-deep .mat-mdc-form-field-icon-suffix {
  align-self: flex-start !important;
  padding-top: 8px !important; /* Ajusta según tu diseño */
}
```

### Inputs (Propiedades):

- `options` _(requerido)_: `MatecuAutocompleteOption[]` - Array de opciones tipo `[value, label][]`
- `placeholder`: `string` - Texto de placeholder (default: `''`)
- `loading`: `boolean` - Muestra indicador de carga (default: `false`)
- `readonly`: `boolean` - Modo de solo lectura (default: `false`)
- `showTooltip`: `boolean` - Muestra tooltip con texto completo en chips largos (default: `true`)
- `allowCreate`: `boolean` - Permite crear nuevas opciones (default: `false`)
- `filterFn`: `MatecuAutocompleteFilterFn` - Función personalizada para filtrar opciones

### Outputs (Eventos):

- `searchChange`: `EventEmitter<string | undefined | null>` - Se emite cuando cambia el texto de búsqueda
- `valueChange`: `EventEmitter<string[] | null>` - Se emite cuando cambian los valores seleccionados

### Métodos Públicos:

#### selectAll()

Selecciona todas las opciones disponibles:

```typescript
// Seleccionar todas las opciones
this.matecuAutocompleteMultiple.selectAll();
```

#### clearAll()

Limpia todas las selecciones:

```typescript
// Limpiar todas las selecciones
this.matecuAutocompleteMultiple.clearAll();
```

#### selectOption(value: string | null)

Selecciona una opción específica programáticamente:

```typescript
// Seleccionar opción específica
this.matecuAutocompleteMultiple.selectOption('us');
```

#### remove(value: string)

Remueve una opción específica de las selecciones:

```typescript
// Remover opción específica
this.matecuAutocompleteMultiple.remove('us');
```

#### openPanel()

Abre el panel de opciones programáticamente:

```typescript
// Abrir panel
this.matecuAutocompleteMultiple.openPanel();
```

### Funcionalidades:

- **Tooltips**: Muestra el texto completo cuando el chip es demasiado largo
- **Teclado**: Soporte para tecla Backspace para eliminar el último chip seleccionado
- **ControlValueAccessor**: Totalmente compatible con Angular Forms (ngModel, FormControl, etc.)
- **MatFormFieldControl**: Integración completa con Angular Material Form Field

### Ejemplo Completo con FormControl:

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-example',
  template: `
    <form [formGroup]="myForm">
      <mat-form-field appearance="outline">
        <mat-label>Tecnologías</mat-label>
        <matecu-autocomplete-multiple
          formControlName="technologies"
          [options]="techOptions"
          placeholder="Seleccionar tecnologías..."
          [showTooltip]="true"
          (searchChange)="onTechSearch($event)"
        ></matecu-autocomplete-multiple>
      </mat-form-field>
    </form>

    <p>Valores seleccionados: {{ myForm.get('technologies')?.value | json }}</p>
  `,
})
export class ExampleComponent {
  myForm: FormGroup;

  techOptions: [string, string][] = [
    ['angular', 'Angular'],
    ['react', 'React'],
    ['vue', 'Vue.js'],
    ['typescript', 'TypeScript'],
    ['javascript', 'JavaScript'],
    ['nodejs', 'Node.js'],
    ['python', 'Python'],
    ['java', 'Java'],
  ];

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      technologies: [['angular', 'typescript']], // valores iniciales
    });
  }

  onTechSearch(searchText: string | undefined | null) {
    // Implementar búsqueda dinámica si es necesario
    console.log('Buscando:', searchText);
  }
}
```

## matecu-datetime-picker (Componente)

Componente para selección de fecha y hora en un solo control.

### Uso:

```typescript
import { MatecuDatetimePicker } from 'angular-matecu';
```

```html
<matecu-datetime-picker
  dateLabel="Fecha"
  timeLabel="Hora"
  apparance="fill"
  [minDate]="minDate"
  [maxDate]="maxDate"
  matTimepickerMin="08:00"
  matTimepickerMax="18:00"
  [timeInterval]="'00:30'"
  [timeOptions]="timeOptions"
  [matDatepickerFilter]="dateFilter"
  (valueChange)="onDateTimeChange($event)"
  [(ngModel)]="selectedDateTime"
>
  <span mat-hint-date>Selecciona una fecha válida</span>
  <span mat-hint-time>Selecciona una hora válida</span>
</matecu-datetime-picker>
```

### Propiedades:

- `dateLabel`: Texto del campo de fecha
- `timeLabel`: Texto del campo de hora
- `apparance`: Apariencia del `mat-form-field` (`fill`, `outline`, etc.)
- `disabled`: Deshabilita el componente
- `minDate` / `maxDate`: Rango permitido para la fecha
- `matTimepickerMin` / `matTimepickerMax`: Rango permitido para la hora (`HH:mm`)
- `timeInterval`: Intervalo de tiempo para opciones del timepicker
- `timeOptions`: Opciones fijas de hora (`MatTimepickerOption<Date>[]`)
- `matDatepickerFilter`: Filtro personalizado para fechas

### Eventos:

- `valueChange`: Emite el valor `Date | null` al cambiar fecha u hora

### Integración con Formularios:

- Implementa `ControlValueAccessor`, por lo que soporta `[(ngModel)]` y formularios reactivos.

### Comportamiento responsive:

- El componente usa `container queries` sobre su host y adapta el layout interno cuando su ancho es menor o igual a `400px`.
- En ese estado, los campos se muestran en columna y se aplican estilos móviles al contenedor interno.
- Puedes personalizar el fondo móvil con la variable CSS `--matecu-datetime-picker-mobile-bg`.

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
