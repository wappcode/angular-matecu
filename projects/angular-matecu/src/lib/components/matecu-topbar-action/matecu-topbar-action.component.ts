import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'matecu-topbar-action',
  templateUrl: './matecu-topbar-action.component.html',
  styleUrls: ['./matecu-topbar-action.component.scss'],
  standalone: true,
})
export class MatecuTopbarActionComponent implements OnInit {
  @HostBinding('class') className = 'matecu-topbar-action';
  constructor() {}

  ngOnInit(): void {}
}
