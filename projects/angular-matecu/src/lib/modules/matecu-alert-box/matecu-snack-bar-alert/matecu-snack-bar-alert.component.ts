import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatecuAlertSnackBarData } from '../types/matecu-alert-snackbar';
import { MatecuAlertBoxType } from '../types/matecu-altert-box-type';

@Component({
  selector: 'matecu-snack-bar-alert',
  templateUrl: './matecu-snack-bar-alert.component.html',
  styleUrls: ['./matecu-snack-bar-alert.component.scss']
})
export class MatecuSnackBarAlertComponent  {

  title: string;
  message: string;
  action?: string;
  classNameBase = 'matecu-alert-snackbar';
  alertColor!: MatecuAlertBoxType ;
  get color(): MatecuAlertBoxType {
    return this.alertColor;
  }
  set color(value: MatecuAlertBoxType ) {
    this.alertColor = value;
    this.className = `${this.classNameBase} ${this.classNameBase}--${value}`;
  }
  @HostBinding('class') className = this.classNameBase;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: MatecuAlertSnackBarData,
    private snackBarRef: MatSnackBarRef<MatecuSnackBarAlertComponent>) { 
    this.title = data.title;
    this.message = data.message;
    this.action = data.action;
    this.color = data.type;

  }

  dismiss():void {
    this.snackBarRef.dismissWithAction();
  }


}
