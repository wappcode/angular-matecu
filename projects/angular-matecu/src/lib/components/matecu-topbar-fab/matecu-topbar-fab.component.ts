import { CommonModule } from '@angular/common';
import { Component, HostBinding, input, signal, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'matecu-topbar-fab',
  templateUrl: './matecu-topbar-fab.component.html',
  styleUrls: ['./matecu-topbar-fab.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class MatecuTopbarFabComponent {
  private mainClassName = 'matecu-topbar-fab';

  display = input(true);
  mobileStyle = input(false);

  @HostBinding('class') className = this.mainClassName;

  constructor() {
    effect(() => {
      this.className = this.className.replace(/mobile-style/g, '').trim();
      if (this.mobileStyle()) {
        this.className = `${this.className} mobile-style`;
      }
    });
  }

  @HostBinding('style.display') get color() {
    return this.display() ? 'flex' : 'none';
  }
}
