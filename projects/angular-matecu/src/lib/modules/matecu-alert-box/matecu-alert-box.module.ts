import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatecuAlertBoxComponent } from './components/matecu-alert-box/matecu-alert-box.component';
import { MatIconModule } from '@angular/material/icon';
import { MatecuAlertDialogComponent } from './components/matecu-alert-dialog/matecu-alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatecuSnackBarAlertComponent } from './matecu-snack-bar-alert/matecu-snack-bar-alert.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatecuAlertSnackBarComponent } from './matecu-alert-snack-bar/matecu-alert-snack-bar.component';

@NgModule({
    declarations: [MatecuAlertBoxComponent, MatecuAlertDialogComponent, MatecuSnackBarAlertComponent, MatecuAlertSnackBarComponent],
    imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule, MatSnackBarModule],
    exports: [MatecuAlertBoxComponent]
})
export class MatecuAlertBoxModule {}
