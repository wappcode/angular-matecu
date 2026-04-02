import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  input,
  effect,
  signal,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'matecu-topbar-search',
  templateUrl: './matecu-topbar-search.component.html',
  styleUrls: ['./matecu-topbar-search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
})
export class MatecuTopbarSearchComponent implements OnInit {
  hasValue = false;
  activeMobileSearch = false;
  inputCtrl = new FormControl('');

  private destroy$ = new Subject<void>();

  display = input(true);
  placeholder = input('');
  delyValueChanges = input(300); // valor en milisegundos
  value = input('');
  mobileStyle = input(false);

  @Output() valueChange = new EventEmitter<string>();
  @HostBinding() className = 'matecu-topbar-search';

  constructor() {
    effect(() => {
      const valueInput = this.value();
      this.inputCtrl.setValue(valueInput);
    });

    effect(() => {
      const mobileStyleValue = this.mobileStyle();
      this.className = this.className.replace(/mobile-style/g, '').trim();
      if (mobileStyleValue) {
        this.className = `${this.className} mobile-style`;
      }
    });
  }

  @HostBinding('style.display') get color() {
    return this.display() ? 'flex' : 'none';
  }
  ngOnInit(): void {
    this.inputCtrl.valueChanges
      .pipe(
        map((value) => value ?? ''),
        tap(this.updateHasValueFn()),
        debounceTime(this.delyValueChanges()),
        distinctUntilChanged(),
        tap((value) => this.valueChange.emit(value!)),
        takeUntil(this.destroy$),
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
