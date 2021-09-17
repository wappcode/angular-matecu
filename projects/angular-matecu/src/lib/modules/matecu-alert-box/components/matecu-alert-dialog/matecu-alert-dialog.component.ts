import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatecuAlertDialogData } from '../../types/matecu-alert-dialog';
@Component({
  selector: 'matecu-alert-dialog',
  templateUrl: './matecu-alert-dialog.component.html',
  styleUrls: ['./matecu-alert-dialog.component.scss'],
})
export class MatecuAlertDialogComponent implements OnInit {
  hasTitle = false;
  hasDismissBtn = false;
  hasActionBtn = false;
  showActions = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: MatecuAlertDialogData,
    public dialogRef: MatDialogRef<MatecuAlertDialogComponent>
  ) {
    this.setHasTitle();
    this.setHasDismissBtn();
    this.setHasActionBtn();
    this.setShowActions();
  }

  ngOnInit(): void {}

  activateAction(): void {
    this.dialogRef.close(true);
  }

  private setHasTitle(): void {
    this.hasTitle = this.isValidString(this.dialogData.title);
  }
  private setHasDismissBtn(): void {
    this.hasDismissBtn = this.isValidString(this.dialogData.dismissText);
  }

  private setHasActionBtn(): void {
    this.hasActionBtn = this.isValidString(this.dialogData.action);
  }
  private setShowActions(): void {
    this.showActions = this.hasActionBtn || this.hasDismissBtn;
  }
  private isValidString(str: string | null | undefined): boolean {
    const isValid = typeof str === 'string' && str.trim().length > 0;
    return isValid;
  }
}
