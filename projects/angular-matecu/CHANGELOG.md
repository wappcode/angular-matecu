Versión 4.0

- Se cambio la estructura de los componentes relacionados con MatecuTopbarLayout
- El color de la barra de MatecuTopbarLayout ya no se obtiene del tema de material design se puede asignar con la variable css --mtb-primary-color
- Se cambio el selector para identifcar la primera y segunda fila MatecuTopbarHeaderRow se usan los atributos first-row y second-row según corresponda
- Se agrego MatecuTopbarHeaderColumn para agregar elementos a la barra puede ser con atributo left-column o right-column
- El output e input de MatecuTopbarSearch es valueChange y value respectivamente.
- MatecuTopbarFab ya no incluye el botón ni su respectiva acción, se deben agregar como contenido.
- Se quitaron los estilos para dispositivos móviles ahora se ajusta con la propiedad mobileStyle de algunos componentes
  Versión 3.0

## Standalone components

- Se cambiaron todos los componentes a tipo standalone. El uso de módulos queda obsoleto y sera removido en futuras versiones

## TopbarLayout

- Se quito el boton de navegación pricipal, input navMenu y output clickNavMenu fueron removidos
- Se quito el boton de navegación pricipal, input actionMenu y output clickActionMenu fueron removidos
- Se elimino componente matecu-topbar-actions queda en su lugar matecu-topbar-action que se puede utilizar en multiple ocaciones
- Es obligatorio agrupar todos los elementos del topbar excepto matecu-topbar-body dentro del elemento matecu-topbar-header-row
- Es obligatorio importar MatSnackBarModule para usar el componente matecu-alert-snack-bar
