import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatecuAlertBoxType } from '../../types/matecu-altert-box-type';

@Component({
  selector: 'matecu-alert-box',
  templateUrl: './matecu-alert-box.component.html',
  styleUrls: ['./matecu-alert-box.component.scss']
})
export class MatecuAlertBoxComponent implements OnInit {

  classNameBase = 'matecu-alert-box';
  alertColor?: MatecuAlertBoxType | undefined | string;
  get color(): MatecuAlertBoxType | undefined | string {
    return this.alertColor;
  }
  @Input() set color(value: MatecuAlertBoxType | undefined | string) {
    this.alertColor = value;
    if (!!value) {
      this.className = `${this.classNameBase} ${this.classNameBase}--${value}`;
    } else {
      this.className = this.classNameBase;
    }
  }
  @HostBinding('class') className = this.classNameBase;
  constructor() { }

  ngOnInit(): void {
  }

}
