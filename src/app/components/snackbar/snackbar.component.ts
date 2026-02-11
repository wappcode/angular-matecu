import { Component, OnInit } from '@angular/core';
import { MatecuSnackBarService } from '../../../../projects/angular-matecu/src/public-api';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  imports: [MatButtonModule],
})
export class SnackbarComponent implements OnInit {
  constructor(private snackBar: MatecuSnackBarService) {}

  ngOnInit(): void {}

  openError(): void {
    this.snackBar.openError('Hola mundo el pueblo unido jamás sera vencido', undefined, 'Deshacer');
  }
  openInfo(): void {
    this.snackBar.openInfo('Hola mundo el pueblo unido jamás sera vencido', undefined, 'Deshacer');
  }
  openWarning(): void {
    this.snackBar.openWarning(
      'Hola mundo el pueblo unido jamás sera vencido',
      undefined,
      'Deshacer',
    );
  }
  openSuccess(): void {
    this.snackBar.openSuccess(
      'Hola mundo el pueblo unido jamás sera vencido',
      undefined,
      'Deshacer',
    );
  }
  open(): void {
    this.snackBar.open('Hola mundo el pueblo unido jamás sera vencido');
  }
}
