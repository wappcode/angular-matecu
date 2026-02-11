import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatecuTopbarLayoutModule } from '../../../../projects/angular-matecu/src/public-api';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topbar-next',
  templateUrl: './topbar-next.component.html',
  styleUrls: ['./topbar-next.component.scss'],
  imports: [MatecuTopbarLayoutModule, MatIconModule],
})
export class TopbarNextComponent {
  constructor() {}
  searchFunction(searchText: string) {
    // process search text
  }
}
