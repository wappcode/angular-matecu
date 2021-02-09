# Angular-Matecu

Libreria con complementos y utilidades  para el desarrollo de aps


# Instalar

    npm install angular-matecu


## matecu-spinner (Componente)
 

Componente que genera un spinner que se puede utilizar para indicar que la app esta realizando algún proceso

Uso:

    <matecu-spinner [active]="true" [color]="'red'" [size]="'30px'" ></matecu-spinner>
    <matecu-spinner [global]="true" [color]="'orange'"></matecu-spinner>

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




