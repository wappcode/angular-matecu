import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatecuAlertBoxType } from '../../../../dist/angular-matecu/lib/modules/matecu-alert-box/types/matecu-altert-box-type';
import { MatecuAlertDialogComponent } from '../../../../projects/angular-matecu/src/lib/modules/matecu-alert-box/components/matecu-alert-dialog/matecu-alert-dialog.component';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent implements OnInit {
  defaultMessage = 'Mensaje de prueba para el díalogo';
  alertDialogType: MatecuAlertBoxType | string | null | undefined;
  showIcon = false;
  dismissText?: string;
  action?: string;
  title?: string;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openBasicDialog(): void {
    const message = this.defaultMessage;
    const type = this.alertDialogType;
    const icon = this.showIcon;
    const dismissText = this.dismissText;
    const action = this.action;
    const title = this.title;
    this.dialog.open(MatecuAlertDialogComponent, {
      data: { message, type, icon, dismissText, action, title },
    });
  }
}
