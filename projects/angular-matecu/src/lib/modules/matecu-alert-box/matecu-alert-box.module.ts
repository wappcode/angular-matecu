import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatecuAlertBoxComponent } from './components/matecu-alert-box/matecu-alert-box.component';
import { MatIconModule } from '@angular/material/icon';
import { MatecuAlertDialogComponent } from './components/matecu-alert-dialog/matecu-alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MatecuAlertBoxComponent, MatecuAlertDialogComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
  exports: [MatecuAlertBoxComponent],
})
export class MatecuAlertBoxModule {}
