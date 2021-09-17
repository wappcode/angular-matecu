import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatecuAlertBoxType } from '../../types/matecu-altert-box-type';

@Component({
  selector: 'matecu-alert-box',
  templateUrl: './matecu-alert-box.component.html',
  styleUrls: ['./matecu-alert-box.component.scss'],
})
export class MatecuAlertBoxComponent implements OnInit {
  classNameBase = 'matecu-alert-box';
  alertColor?: MatecuAlertBoxType | undefined | string | null;
  iconValue?: string | null | undefined;
  private alertIcon = false;
  get color(): MatecuAlertBoxType | undefined | string | null {
    return this.alertColor;
  }
  @Input() set color(value: MatecuAlertBoxType | undefined | string | null) {
    this.alertColor = value;
    if (!!value) {
      this.className = `${this.classNameBase} ${this.classNameBase}--${value}`;
    } else {
      this.className = this.classNameBase;
    }
    this.updateIcon();
  }
  get icon(): boolean {
    return this.alertIcon;
  }
  @Input() set icon(value: boolean) {
    this.alertIcon = value;
  }
  @HostBinding('class') className = this.classNameBase;
  constructor() {}

  ngOnInit(): void {}

  private updateIcon(): void {
    switch (this.color) {
      case MatecuAlertBoxType.danger:
        this.iconValue = 'dangerous';
        break;
      case MatecuAlertBoxType.warning:
        this.iconValue = 'warning';
        break;
      case MatecuAlertBoxType.success:
        this.iconValue = 'check_circle';
        break;
      case MatecuAlertBoxType.info:
        this.iconValue = 'info';
        break;
      default:
        this.iconValue = null;
        break;
    }
  }
}
