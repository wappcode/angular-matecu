import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { MatecuAlertBoxType } from '../../../../projects/angular-matecu/src/lib/types/matecu-altert-box-type';
import { MatecuAlertDialogComponent } from '../../../../projects/angular-matecu/src/public-api';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  imports: [
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AlertDialogComponent implements OnInit {
  defaultMessage =
    'Mensaje de prueba para el díalogo. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda accusamus magni rerum aut ducimus ab. Illum numquam molestias voluptates enim nisi, nemo ab perferendis autem iure corrupti modi ducimus sequi?';
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
    const dialogRef = this.dialog.open(MatecuAlertDialogComponent, {
      data: { message, type, icon, dismissText, action, title },
    });
    dialogRef
      .afterClosed()
      .pipe(filter((execAction) => !!execAction))
      .subscribe();
  }
}
