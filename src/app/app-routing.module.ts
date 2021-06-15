import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { IndexComponent } from './components/index/index.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TopbarComponent } from './components/topbar/topbar.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'spinner',
    component: SpinnerComponent
  },
  {
    path: 'topbar',
    component: TopbarComponent
  },
  {
    path: 'alert-box',
    component: AlertBoxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
