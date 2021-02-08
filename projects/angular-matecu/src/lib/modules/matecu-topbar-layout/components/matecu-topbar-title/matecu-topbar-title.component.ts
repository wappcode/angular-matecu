import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'matecu-topbar-title',
  templateUrl: './matecu-topbar-title.component.html',
  styleUrls: ['./matecu-topbar-title.component.scss']
})
export class MatecuTopbarTitleComponent implements OnInit {

  @HostBinding('class') className = 'title';
  constructor() { }

  ngOnInit(): void {
  }

}
