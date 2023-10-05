import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  searchCtrl: UntypedFormControl | null = new UntypedFormControl();
  actionMenu = true;
  prominent = true;
  showFab = true;
  navMenu = true;
  fabLarge = false;
  twoRows = false;
  searchPlaceholder = 'Buscar';
  searchValue: string = '';
  constructor() {}

  ngOnInit(): void {}

  toogleSearch(event: MatCheckboxChange): void {
    if (event.checked) {
      this.searchCtrl = new UntypedFormControl();
    } else {
      this.searchCtrl = null;
    }
  }
  clickNavMenu(): void {
    alert('click nav menu');
  }
  clickActionMenu(): void {
    alert('click action menú');
  }
  clickFabButton(): void {
    alert('click fab button');
  }
  searching(search: string): void {
    console.log('resultado search: ', search);
  }
}
