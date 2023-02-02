import { CommonModule } from '@angular/common';
import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatecuAlertSnackBarData } from '../../types/matecu-alert-snackbar';
import { MatecuAlertBoxType } from '../../types/matecu-altert-box-type';

@Component({
  selector: 'matecu-alert-snack-bar',
  templateUrl: './matecu-alert-snack-bar.component.html',
  styleUrls: ['./matecu-alert-snack-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class MatecuAlertSnackBarComponent {

  title: string;
  message: string;
  action?: string;
  classNameBase = 'matecu-alert-snackbar';
  alertColor!: MatecuAlertBoxType;
  get color(): MatecuAlertBoxType {
    return this.alertColor;
  }
  set color(value: MatecuAlertBoxType) {
    this.alertColor = value;
    this.className = `${this.classNameBase} ${this.classNameBase}--${value}`;
  }
  @HostBinding('class') className = this.classNameBase;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: MatecuAlertSnackBarData,
    private snackBarRef: MatSnackBarRef<MatecuAlertSnackBarComponent>) {
    this.title = data.title;
    this.message = data.message;
    this.action = data.action;
    this.color = data.type;

  }

  dismiss(): void {
    this.snackBarRef.dismissWithAction();
  }


}
