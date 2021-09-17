# Angular-Matecu

Libreria con complementos y utilidades  para el desarrollo de aps


# Instalar

    npm install angular-matecu


## matecu-spinner (Componente)
 

Componente que genera un spinner que se puede utilizar para indicar que la app esta realizando algún proceso

### Uso:

Importar módulo

    import { MatecuSpinnerModule } from 'angular-matecu';

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

Importar módulo

    import { MatecuAlertBoxModule } from 'angular-matecu';

Agregar a la plantilla de algún componente 

    <matecu-alert-box color="success"> Alerta Success </matecu-alert-box>

Colores: 
    - warning
    - danger
    - success
    - info

## matecu-alert-dialog (Componente)

Dialogo de alerta o confirmación

### Uso:

Importar módulo

    import { MatecuAlertBoxModule } from 'angular-matecu';

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


# matecu-topbar-layout (Componente)

### Uso:

Importar módulo

    import { MatecuTopbarLayoutModule } from 'angular-matecu';


Agregar a la plantilla de algún componente:

        <matecu-topbar-layout
            [prominent]="prominent"
            [searchControl]="searchCtrl"
            [searchPlaceholder]="searchPlaceholder"
            [actionMenu]="actionMenu"
            [navMenu]="navMenu"
            (clickNavMenu)="clickNavMenu()"
            (clickActionMenu)="clickActionMenu()"
        >
        <matecu-topbar-title>Topbar Layout</matecu-topbar-title>
  
        <matecu-topbar-fab *ngIf="showFab" (clickAction)="clickFabButton()">
            <mat-icon>add</mat-icon> el pueblo unido
        </matecu-topbar-fab>

        <matecu-topbar-body>
            Contenido de la página
        </matecu-topbar-body>
    </matecu-topbar-layout>

Propiedades:

- prominent: (boolean) Establece si la barra es prominente o no
- searchControl: (FormControl) Campo para la opción de búsqueda (opcional).
- searchPlaceholder: (string) Texto a mostrar en el campo de búsqueda (opcional).
- actionMenu: (boolean) Muestra el botón para más acciones
- navMenu: (boolean) Muestra el botón para la barra de navegación o menú
- clickNavMenu: (function) Acción que se ejecuta en el evento click del botón de menu (opcional).
- clickActionMenu: (function) Acción que se ejecuta en el evento click del botón de más acciones (opcional).

Componentes adicionales

- matecu-topbar-title: Componente para agregar título a la barra (opcional)
- matecu-topbar-fab: Componente para agregar el contenido del botón pricipal (opcional)
- matecu-topbar-body: Componente para agregar el contenid de la página.
