import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatecuSpinnerComponent } from './components/matecu-spinner/matecu-spinner.component';



@NgModule({
  declarations: [MatecuSpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MatecuSpinnerComponent
  ]
})
export class MatecuSpinnerModule { }
