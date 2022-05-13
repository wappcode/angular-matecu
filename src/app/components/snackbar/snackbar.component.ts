import { Component, OnInit } from '@angular/core';
import { MatecuSnackBarService } from '../../../../projects/angular-matecu/src/lib/modules/matecu-alert-box/services/matecu-snack-bar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(private snackBar: MatecuSnackBarService) { }

  ngOnInit(): void {
  }

  openError(): void {
    this.snackBar.openError('Hola mundo el pueblo unido jamás sera vencido', undefined, 'Deshacer');
  }
  openInfo(): void {
    this.snackBar.openInfo('Hola mundo el pueblo unido jamás sera vencido', undefined, 'Deshacer');
  }
  openWarning(): void {
    this.snackBar.openWarning('Hola mundo el pueblo unido jamás sera vencido', undefined, 'Deshacer');
  }
  openSuccess(): void {
    this.snackBar.openSuccess('Hola mundo el pueblo unido jamás sera vencido', undefined, 'Deshacer');
  }
  open(): void {
    this.snackBar.open('Hola mundo el pueblo unido jamás sera vencido');
  }

}
