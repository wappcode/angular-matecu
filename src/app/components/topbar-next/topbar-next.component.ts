import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-topbar-next',
  templateUrl: './topbar-next.component.html',
  styleUrls: ['./topbar-next.component.scss'],
})
export class TopbarNextComponent {
  constructor() {}
  searchFunction(searchText: string) {
    // process search text
  }
}
