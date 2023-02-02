import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'matecu-topbar-row',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './matecu-topbar-row.component.html',
  styleUrls: ['./matecu-topbar-row.component.scss']
})
export class MatecuTopbarRowComponent {

}
