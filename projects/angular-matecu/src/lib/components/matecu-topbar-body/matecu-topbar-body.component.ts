import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'matecu-topbar-body',
  templateUrl: './matecu-topbar-body.component.html',
  styleUrls: ['./matecu-topbar-body.component.scss'],
  standalone: true,
})
export class MatecuTopbarBodyComponent {
  @HostBinding('class') className = 'matecu-topbar-body';
}
