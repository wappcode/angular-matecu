import { Component, OnInit } from '@angular/core';
import { MatecuSpinnerService } from 'projects/angular-matecu/src/public-api';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  active = true;
  constructor(
    private spinner: MatecuSpinnerService
  ) { }

  ngOnInit(): void {

  }

  activateSpinner(seconds: number): void {
    const spinnerKey = this.spinner.add();
    setTimeout(() => {
      this.spinner.remove(spinnerKey);
    } , seconds * 1000);
  }



}
