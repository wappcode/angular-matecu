import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'matecu-topbar-search',
  templateUrl: './matecu-topbar-search.component.html',
  styleUrls: ['./matecu-topbar-search.component.scss'],
})
export class MatecuTopbarSearchComponent implements OnInit {
  showMobileInput = false;
  searchInput = new FormControl();
  private destroy = new Subject();
  @Input() searchPlaceholder = 'Buscar';
  @Input() debounceTime = 500;
  @Input() inputType: 'text' | 'search' = 'text';
  @Output() whenSearchChanges = new EventEmitter<string>();
  @Output() whenCloseMobile = new EventEmitter<boolean>();
  @HostBinding('class') className = 'matecu-topbar-search';
  constructor() {}

  ngOnInit(): void {
    this.watchSearch();
  }

  toogleSearch(): void {
    this.showMobileInput = !this.showMobileInput;
  }
  closeMobile(): void {
    this.whenCloseMobile.emit(true);
    this.showMobileInput = false;
  }

  private watchSearch(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap((value) => this.searchChanges(value)),
        takeUntil(this.destroy)
      )
      .subscribe();
  }
  private searchChanges(searchVal?: string | null): void {
    const value =
      typeof searchVal === 'string' && searchVal.length > 0 ? searchVal : '';
    this.whenSearchChanges.emit(value);
  }
}
