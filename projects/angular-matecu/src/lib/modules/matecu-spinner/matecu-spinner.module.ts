import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatecuSpinnerComponent } from './components/matecu-spinner/matecu-spinner.component';
import { MatecuSpinnerService } from './services/matecu-spinner.service';



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
