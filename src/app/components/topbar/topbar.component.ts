import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  searchCtrl: FormControl | null = null;
  actionMenu = false;
  constructor() { }

  ngOnInit(): void {
  }

  toogleSearch(event: MatCheckboxChange): void {
    if (event.checked) {
      this.searchCtrl = new FormControl();
    } else {
      this.searchCtrl = null;
    }
  }
  clickNavMenu(): void{
    alert('click nav menu');
  }
  clickActionMenu(): void {
    alert('click action menú');
  }
  clickFabButton(): void {
    alert('click fab button');
  }
}
