import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { MatecuAlertSnackBarComponent } from '../components/matecu-alert-snack-bar/matecu-alert-snack-bar.component';
import { MatecuAlertSnackBarData } from '../types/matecu-alert-snackbar';
import { MatecuAlertBoxType } from '../types/matecu-altert-box-type';

@Injectable({
  providedIn: 'root'
})
export class MatecuSnackBarService {

  constructor(private snackBar: MatSnackBar) { }



  openError(error: string | Error, title?: string | null, action?: string, config?:MatSnackBarConfig<any>): MatSnackBarRef<MatecuAlertSnackBarComponent> {
    const message = this.getErrorMessage(error);
    const titleStr = title || 'ERROR';
    const type = MatecuAlertBoxType.danger;
    return this.openAlert(message, titleStr, type, action, config);
  }
  openSuccess(message: string, title?: string | null, action?: string, config?:MatSnackBarConfig<any>): MatSnackBarRef<MatecuAlertSnackBarComponent> {
    const titleStr = title || 'OK';
    const type = MatecuAlertBoxType.success;
    return this.openAlert(message, titleStr, type, action, config);
  }
  openWarning(message: string, title?: string | null, action?: string, config?:MatSnackBarConfig<any>): MatSnackBarRef<MatecuAlertSnackBarComponent> {
    const titleStr = title || 'WARNING';
    const type = MatecuAlertBoxType.warning;
    return this.openAlert(message, titleStr, type, action, config);
  }
  openInfo(message: string, title?: string | null, action?: string, config?:MatSnackBarConfig<any>): MatSnackBarRef<MatecuAlertSnackBarComponent> {
    const titleStr = title || 'INFO';
    const type = MatecuAlertBoxType.info;
    return this.openAlert(message, titleStr, type, action, config);
  }
  open(message: string, action?: string, config?: MatSnackBarConfig<any>): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action,config);
  }
  dismiss(): void {
    this.snackBar.dismiss()
  }
  private openAlert(message: string, title: string, type: MatecuAlertBoxType, action?: string, config?:MatSnackBarConfig<any> ) {

    const data: MatecuAlertSnackBarData = {
      message,
      title,
      action,
      type
    }
    const dialogConfig = {...config, data}
    
    return this.snackBar.openFromComponent(MatecuAlertSnackBarComponent, dialogConfig);
  }

  private getErrorMessage(err: string | Error ): string {
    const error = new Error()
    if (typeof err === 'string') {
      return err;
    }
    if (err instanceof Error) {
      return err.message;
    }
    return '';
  }
}
