import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'matecu-topbar-search',
  templateUrl: './matecu-topbar-search.component.html',
  styleUrls: ['./matecu-topbar-search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class MatecuTopbarSearchComponent implements OnInit {
  hasValue = false;
  mobileStyle = false;
  activeMobileSearch = false;
  inputCtrl = new FormControl('');
  private _value = '';

  private destroy$ = new Subject<void>();
  @Input() display = true;
  @Input() placeholder = '';
  @Input() delyValueChanges = 300; // valor en milisegundos
  @Input() get value() {
    return this._value;
  }
  set value(v: string) {
    this._value = v;
    this.inputCtrl.setValue(v);
  }
  @Output() valueChange = new EventEmitter<string>();
  ngOnInit(): void {
    this.inputCtrl.valueChanges
      .pipe(
        map((value) => value ?? ''),
        tap(this.updateHasValueFn()),
        debounceTime(this.delyValueChanges),
        distinctUntilChanged(),
        tap((value) => this.valueChange.emit(value!)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  toggleActiveMobildeSearch() {
    this.activeMobileSearch = !this.activeMobileSearch;
  }
  clearSearch() {
    this.inputCtrl.setValue('');
    this.activeMobileSearch = false;
  }
  updateHasValueFn() {
    return (value: string): void => {
      this.hasValue = value.length > 0;
    };
  }
}
