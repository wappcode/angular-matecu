import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatecuTopbarLayoutModule } from '../../../../projects/angular-matecu/src/public-api';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  imports: [
    MatecuTopbarLayoutModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
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
  resizeWidth?: number;
  mobileStyle = false;
  constructor() {}

  changeMobileStyle(mb: boolean) {
    console.log('mobile style top component', this.mobileStyle, mb);
  }
  resizing(width: number) {
    console.log('resizing', width);
  }
  ngOnInit(): void {}

  toogleSearch(event: MatCheckboxChange): void {
    if (event.checked) {
      this.searchCtrl = new FormControl();
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
