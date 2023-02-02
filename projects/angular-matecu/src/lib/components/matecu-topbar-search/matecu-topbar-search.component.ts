import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule]
})
export class MatecuTopbarSearchComponent implements OnInit {
  showMobileInput = false;
  searchInput = new UntypedFormControl();
  showDescktopCleanBtn = false;
  private destroy = new Subject();
  @Input() searchPlaceholder = 'Buscar';
  @Input() debounceTime = 500;
  @Input() inputType: 'text' | 'search' = 'text';
  @Input() cleanWhenClose = true;
  @Input() set value(val: string | null | undefined) {
    if (typeof val === 'string') {
      this.searchInput.setValue(val);
    } else {
      this.searchInput.reset();
    }
  }
  @Output() valueChange = new EventEmitter<string>();
  @Output() whenSearchChanges = new EventEmitter<string>();
  @HostBinding('class') className = 'matecu-topbar-search';
  constructor() { }

  ngOnInit(): void {
    this.watchSearch();
  }

  toogleSearch(): void {
    this.showMobileInput = !this.showMobileInput;
  }
  closeMobile(): void {
    if (this.cleanWhenClose) {
      this.searchInput.reset();
    }
    this.showMobileInput = false;
  }

  private watchSearch(): void {
    this.searchInput.valueChanges
      .pipe(
        tap((value) => this.setShowDescktopCleanBtn(value)),
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
    this.valueChange.emit(value);
  }
  private setShowDescktopCleanBtn(value: string | null | undefined): void {
    this.showDescktopCleanBtn = typeof value === 'string' && value.length > 0;
  }
}
