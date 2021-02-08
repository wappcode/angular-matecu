import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'matecu-topbar-layout',
  templateUrl: './matecu-topbar-layout.component.html',
  styleUrls: ['./matecu-topbar-layout.component.scss']
})
export class MatecuTopbarLayoutComponent implements OnInit {

  @HostBinding('class') className = 'matecu-topbar-layout';
  showSearchInput = false;
  search = false;
  placeholder = 'Buscar';
  color = 'primary';
  searchInput: FormControl = new FormControl();
  @Input() navMenu = true;
  @Input() actionMenu = false;
  @Output() clickNavMenu = new EventEmitter<void>();
  @Output() clickActionMenu = new EventEmitter<void>();

  @Input() set searchController(value: FormControl | null) {
    if (!!value) {
      this.searchInput = value;
      this.search = true;
    } else {
      this.searchInput = new FormControl();
      this.search = false;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  toogleSearch(): void {
    this.showSearchInput = !this.showSearchInput;
  }
  closeSearch(): void {
    this.showSearchInput = false;
    this.searchInput.reset();
  }
  onMenuClick(): void {
  }
  onClickNavMenu(): void {
    this.clickNavMenu.emit();
  }
  onClickActionMenu(): void {
    this.clickActionMenu.emit();
  }
}
