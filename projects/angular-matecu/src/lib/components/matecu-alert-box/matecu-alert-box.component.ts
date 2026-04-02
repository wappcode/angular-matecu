import { CommonModule } from '@angular/common';
import { Component, HostBinding, input, effect, signal, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatecuAlertBoxType } from '../../types/matecu-altert-box-type';

@Component({
  selector: 'matecu-alert-box',
  templateUrl: './matecu-alert-box.component.html',
  styleUrls: ['./matecu-alert-box.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class MatecuAlertBoxComponent implements OnInit {
  classNameBase = 'matecu-alert-box';
  iconValue?: string | null | undefined;

  color = input<MatecuAlertBoxType | undefined | string | null>(undefined);
  icon = input(false);

  @HostBinding('class') className = this.classNameBase;

  constructor() {
    effect(() => {
      const colorValue = this.color();
      if (!!colorValue) {
        this.className = `${this.classNameBase} ${this.classNameBase}--${colorValue}`;
      } else {
        this.className = this.classNameBase;
      }
      this.updateIcon(colorValue);
    });
  }

  ngOnInit(): void {}

  private updateIcon(colorValue?: MatecuAlertBoxType | undefined | string | null): void {
    switch (colorValue) {
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
