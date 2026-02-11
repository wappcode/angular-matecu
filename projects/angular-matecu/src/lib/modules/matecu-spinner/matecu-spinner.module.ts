import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatecuSpinnerComponent } from '../../components/matecu-spinner/matecu-spinner.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatecuSpinnerComponent
  ],
  exports: [
    MatecuSpinnerComponent
  ]
})
export class MatecuSpinnerModule { }
