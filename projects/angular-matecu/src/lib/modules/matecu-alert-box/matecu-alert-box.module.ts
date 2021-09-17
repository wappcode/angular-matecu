import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatecuAlertBoxComponent } from './components/matecu-alert-box/matecu-alert-box.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MatecuAlertBoxComponent],
  imports: [CommonModule, MatIconModule],
  exports: [MatecuAlertBoxComponent],
})
export class MatecuAlertBoxModule {}
