import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { IndexComponent } from './components/index/index.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TopbarComponent } from './components/topbar/topbar.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
