import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'matecu-topbar-header-row',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './matecu-topbar-header-row.component.html',
  styleUrls: ['./matecu-topbar-header-row.component.scss'],
})
export class MatecuTopbarHeaderRowComponent {
  @Input() display = true;
  @HostBinding('class') className = 'matecu-topbar-header-row';
  @HostBinding('style.display') get color() {
    return this.display ? 'flex' : 'none';
  }
}
