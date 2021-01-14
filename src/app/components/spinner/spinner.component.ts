import { Component, OnInit } from '@angular/core';
import { MatecuSpinnerService } from 'angular-matecu';
import { timer } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';

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
      console.log("desactivando clave", spinnerKey);
    } , seconds * 1000);
  }



}
