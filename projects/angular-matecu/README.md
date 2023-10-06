# Angular-Matecu

Libreria con complementos y utilidades para el desarrollo de aps

# Instalar

    npm install angular-matecu

Para versiones de angular menores a 15 utilizar la versión ^2.0

    npm install angular-matecu@^2.0

ver [CHANGELOG](CHANGELOG.md)

## matecu-spinner (Componente)

Componente que genera un spinner que se puede utilizar para indicar que la app esta realizando algún proceso

### Uso:

Importar componente o módulo

    import { MatecuSpinnerComponent } from 'angular-matecu';

Agregar a la plantilla de algún componente

    <matecu-spinner active="true" color="'red'" size="'30px'" ></matecu-spinner>
    <matecu-spinner global="true" color="'orange'"></matecu-spinner>

Propiedades:

- active: (boolean) True muestra el spinner, False lo oculta
- color: (string) Color del spinner
- size: (string) Tamaño del spinner
- global: (boolean) True indica que el cambio de visible a oculto será aplicado utilizando el servicio del spinner y aplicará a todos los que tengan asignada esta propiedad como True sin importar el valor asignado a "active"

## Servicio (MatecuSpinnerService)

Uso:

    // import { MatecuSpinnerService } from 'angular-matecu';
    ....
    key: string; //
    construct( private spinnerService: MatecuSpinnerService) {}
    ....
    // mostrar el spinner
    show() {
        this.key = this.spinnerService.add();
    }
    // ocultar el spinner
    hide() {
        this.spinnerService.remove(this.key);
    }

Métodos:

- watch: Retorna un observable boolean indicando si el spinner esta activo. El espinner se mantendrá activo mientras haya elementos en la lista de claves del servico. No es necesario usar este método, el componente spinner lo usa de forma transparente.

- add: Crea y agrega una clave en la lista del servico. Se puede pasar como parámetro una clave personalizada.

- remove: Elimina de la lista del servicio las claves que sean igual a la clave pasada como parámetro

- clear: Elimina todas las claves forzando a que el spinner pase al estado inactivo.

## matecu-alert-box (Componente)

### Uso:

Importar componente o módulo

    import { MatecuAlertBoxComponent } from 'angular-matecu';

Agregar a la plantilla de algún componente

    <matecu-alert-box color="success"> Alerta Success </matecu-alert-box>

Colores: - warning - danger - success - info

## matecu-alert-dialog (Componente)

Dialogo de alerta o confirmación

### Uso:

Importar módulo

En el componente

    import { MatDialog } from '@angular/material/dialog';
    import { MatecuAlertDialogComponent, MatecuAlertBoxType } from 'angular-matecu';
    import { filter } from 'rxjs/operators';

    // ....
    constructor(private dialog: MatDialog) {}

    openBasicDialog(): void {
    const message = 'Mensaje a mostrar';
    const type = 'warning'; // warning, danger, success, info
    const icon = true
    const dismissText = 'Cancelar'; // texto del boton para cerrar el diálogo (opcional)
    const action = 'Confirmar'; // texto del boton para activar la acción pricipal del diálogo (opcional)
    const title = 'Titulo del diálogo';
    const dialogRef = this.dialog.open(MatecuAlertDialogComponent, {
      data: { message, type, icon, dismissText, action, title },
    });
    // afterClosed retorna un valor boolean o null que se puede utilizar para determinar si se va a ejecutar alguna acción
    dialogRef.afterClosed().pipe(
      filter(execAction => !!execAction)
    ).subscribe();

}

## MatecuSnackBarService

Servicio para abrir dialogos snackBar con titulos con colores para Error, Success, Warning, Info

### Uso

Importar en el módulo MatecuAlertBoxModule en app.module

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

En el componente

    import { MatecuSnackBarService } from 'angular-matecu';

     // ....
    constructor(private snackBar: MatecuSnackBarService) { }

    openError(): void {
         this.snackBar.openError('Mensaje de error');
    }

### Métodos

    - openError()
    - openInfo()
    - openWarning()
    - openSuccess()
    - open()
    - dismiss()

## MatecuTopbarLayout

Crea la estructura para una página que contiene un topbar en posición fija a la que se le pueden agregar botones de acciones, titulo y buscador.

El contenido de la página tiene una función que se puede llamar para realizar un desplazamiento hacia arriba.

## Ejemplo básico

Importar módulo o componentes

```
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
    MatButtonModule
    // ...
    ],
    providers: [],
    bootstrap: [AppComponent],
    })
    export class AppModule {}
```

Agregar a la plantilla de algún componente:

```
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

```
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

````
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

- mobileStyleChange: Propiedad que se actualiza cuando se redimenciona el componente y se calcula utilizando el valor de mobileWidth. Indica si se deben aplicar estilos para dispositivos móviles
- whenResize: Evento que se emite cuando se redimenciona el componente y retorna el nuevo valor del ancho.

### Metodos

- scrollTop : Funcion que se puede llamar desde el componente padre y hace scroll del contenido hacia la parte superior

### MatecuTopbarHeaderRow

Crea una fila para agregar contenido en el encabezado, pueden agregarse hasta 2 filas y es necesario agregar alguno de los siguientes atributos first-row, second-row

#### Variables de estilos

- --mtb-row-padding
- --mtb-row-margin
- --mtb-row-width

### MatecuTopbarHeaderColumn

Crea una columna para agregar contenido a una fila del encabezado es necesario agregar alguno de los siguientes atributos left-column,right-column

### MatecuTopbarAction

Crea un contenedor para agregar acciones como links o botones preferentemente en formato de iconos

#### Variables de estilos

- --mtb-action-padding
- --mtb-action-margin

### MatecuTopbarFab

Crea un contenedor para agregar un boton (FAB)

#### Variables de estilos

- --mtb-fab-mobile-bottom-position : Posición relativa a la parte inferior del componente pricipal que se aplica cuando estan activos los estilos para dispositivos móviles.

- --mtb-fab-mobile-right-position: Posición relativa a la parte inferior del componente MatecuTopbarLayout

#### Inputs

- mobileStyle: Valor boolaneo que indica si se ajustan los estilos para dispositivos móviles
- display: Valor boolean que indica si se debe mostrar el componente

### MatecuTopbarSearch

Crea un campo de texto para hacer búsquedas

#### Inputs

- value: Especifica el valor de la búsqueda
- mobileStyle: Valor boolaneo que indica si se ajustan los estilos para dispositivos móviles
- placeholder: Valor del Placeholder del campo de búsqueda
- display: Valor boolean que indica si se debe mostrar el componente

#### Outputs

- valueChanges: Emite un evento con el valor del texto ingresado en el campo de búsqueda

### MatecuTopbarTitle

Crea un contenedor para agregar un título a la página.

#### Variables de estilos

- --mtb-title-padding
- --mtb-title-margin

### MatecuTopbarBody

Crea un contenedor para agregar el contenido de la página

#### Variables de estilos

--mtb-body-padding: Padding para el contenido
--mtb-body-background: Fondo del contenido;
--mtb-body-padding-button: Padding inferior (Es utilizado para asignar un espacio al Botón principal (FAB) cuando tiene asignados los estilos para dispositivos móviles)
````
