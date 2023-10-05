import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'matecu-topbar-fab',
  templateUrl: './matecu-topbar-fab.component.html',
  styleUrls: ['./matecu-topbar-fab.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class MatecuTopbarFabComponent {
  private _mobileStyle = false;
  private mainClassName = 'matecu-topbar-fab';
  @Input() display = true;
  @Input() get mobileStyle() {
    return this._mobileStyle;
  }
  set mobileStyle(value: boolean) {
    this._mobileStyle = value;
    this.className = this.className.replace(/mobile-style/g, '').trim();
    if (this._mobileStyle) {
      this.className = `${this.className} mobile-style`;
    }
  }

  @HostBinding('class') className = this.mainClassName;
  @HostBinding('style.display') get color() {
    return this.display ? 'flex' : 'none';
  }
}
