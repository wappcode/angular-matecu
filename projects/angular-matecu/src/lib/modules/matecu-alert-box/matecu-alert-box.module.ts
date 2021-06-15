import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatecuAlertBoxComponent } from './components/matecu-alert-box/matecu-alert-box.component';



@NgModule({
  declarations: [MatecuAlertBoxComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MatecuAlertBoxComponent
  ]
})
export class MatecuAlertBoxModule { }
