import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'matecu-topbar-body',
  templateUrl: './matecu-topbar-body.component.html',
  styleUrls: ['./matecu-topbar-body.component.scss']
})
export class MatecuTopbarBodyComponent implements OnInit {

  @HostBinding('class') className = 'matecu-topbar-body';
  constructor() { }

  ngOnInit(): void {
  }

}
