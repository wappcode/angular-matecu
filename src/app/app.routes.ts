import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TopbarNextComponent } from './components/topbar-next/topbar-next.component';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { Autocomplete } from './components/autocomplete/autocomplete';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'spinner',
    component: SpinnerComponent,
  },
  {
    path: 'topbar',
    component: TopbarComponent,
  },
  {
    path: 'topbar-next',
    component: TopbarNextComponent,
  },
  {
    path: 'alert-box',
    component: AlertBoxComponent,
  },
  {
    path: 'alert-dialog',
    component: AlertDialogComponent,
  },
  {
    path: 'snackbar',
    component: SnackbarComponent,
  },
  {
    path: 'autocomplete',
    component: Autocomplete,
  },
];
