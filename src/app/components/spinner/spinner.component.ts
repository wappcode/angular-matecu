import { Component, OnInit } from '@angular/core';
import {
  MatecuSpinnerComponent,
  MatecuSpinnerService,
} from '../../../../projects/angular-matecu/src/public-api';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports: [MatecuSpinnerComponent, MatCheckboxModule, FormsModule],
})
export class SpinnerComponent implements OnInit {
  active = true;
  constructor(private spinner: MatecuSpinnerService) {}

  ngOnInit(): void {}

  activateSpinner(seconds: number): void {
    const spinnerKey = this.spinner.add();
    setTimeout(() => {
      this.spinner.remove(spinnerKey);
    }, seconds * 1000);
  }
}
