import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
