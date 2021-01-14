import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'spinner',
    component: SpinnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
