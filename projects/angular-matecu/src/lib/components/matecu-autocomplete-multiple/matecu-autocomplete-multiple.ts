import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnDestroy,
  signal,
  computed,
  effect,
  inject,
  OnInit,
  Injector,
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatFormFieldControl } from '@angular/material/form-field';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CdkFixedSizeVirtualScroll, ScrollingModule } from '@angular/cdk/scrolling';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'matecu-autocomplete-multiple',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatChipsModule,
    DragDropModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    CdkFixedSizeVirtualScroll,
    ScrollingModule,
  ],
  templateUrl: './matecu-autocomplete-multiple.html',
  styleUrls: ['./matecu-autocomplete-multiple.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatecuAutocompleteMultiple),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: MatecuAutocompleteMultiple,
    },
  ],
})
export class MatecuAutocompleteMultiple
  implements ControlValueAccessor, MatFormFieldControl<string[]>, OnDestroy, OnInit
{
  static nextId = 0;

  // ================= INPUTS =================

  @Input() placeholder = '';
  @Input() preload = false;
  @Input() debounceTime = 300;
  @Input() enableSelectAll = true;
  @Input() readonly = false;

  private _options = signal<[string, string][]>([]);

  @Input({ required: true })
  set options(value: [string, string][]) {
    this._options.set(value ?? []);
  }

  get options() {
    return this._options();
  }

  // ================= OUTPUT =================

  @Output() searchChange = new EventEmitter<string>();

  // ================= INTERNAL CONTROL =================

  control = new FormControl<string[]>([], { nonNullable: true });
  controlValue$ = toSignal(this.control.valueChanges);
  searchControl = new FormControl<string>('', { nonNullable: true });
  @ViewChild(MatAutocompleteTrigger)
  autocompleteTrigger!: MatAutocompleteTrigger;

  // ================= SIGNALS =================

  readonly searchText = signal<string>(''); // 🔥 AHORA SÍ existe correctamente

  readonly filteredOptions = computed(() => {
    const filter = this.searchText().toLowerCase();

    return this._options().filter(
      (o) => o[1].toLowerCase().includes(filter) && !this.control.value.includes(o[0]),
    );
  });

  readonly selectedItems = computed(() => {
    const values = this.controlValue$() ?? [];
    return values.map((v) => {
      const found = this._options().find((o) => o[0] === v);
      return {
        value: v,
        label: found ? found[1] : v,
      };
    });
  });

  // ================= FORM FIELD CONTROL =================

  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'autocomplete-multiple';
  id = `autocomplete-multiple-${MatecuAutocompleteMultiple.nextId++}`;
  describedBy = '';
  disabled = false;
  required = false;
  errorState = false;
  private injector: Injector;
  ngControl: NgControl | null = null;

  get empty() {
    return this.control.value.length === 0;
  }

  get shouldLabelFloat() {
    return true;
  }

  // ================= CONSTRUCTOR =================

  constructor(injector: Injector) {
    this.injector = injector;
    // Debounce search
    let timeout: any;

    this.searchControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.searchText.set(value ?? '');
    });
    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.onChange(value);
      this.stateChanges.next();
    });
    effect(() => {
      const value = this.searchText();

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        this.searchChange.emit(value);
      }, this.debounceTime);
    });
  }
  value: string[] | null = null;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  disableAutomaticLabeling?: boolean | undefined;
  describedByIds?: string[] | undefined;

  ngOnInit(): void {
    try {
      this.ngControl = this.injector.get(NgControl, null);
    } catch (error) {
      // Ignorar si no se puede obtener NgControl
      this.ngControl = null;
    }
    // Propagar cambios del FormControl interno
  }
  // ================= AUTOCOMPLETE =================

  selectOption(option: [string, string]) {
    if (this.readonly || this.disabled) return;
    if (!Array.isArray(option)) return;
    if (!this.control.value.includes(option[0])) {
      this.control.setValue([...this.control.value, option[0]]);
    }

    // limpiar input correctamente
    this.searchControl.setValue('');
    this.searchText.set('');

    // cerrar panel
    this.autocompleteTrigger.closePanel();
  }
  displayLabel(option: [string, string]): string {
    return Array.isArray(option) ? option[1] : '';
  }

  // ================= CHIP ACTIONS =================

  remove(value: string) {
    if (this.readonly || this.disabled) return;

    this.control.setValue(this.control.value.filter((v) => v !== value));
  }

  selectAll() {
    if (this.readonly || this.disabled) return;

    const allValues = this._options().map((o) => o[0]);

    this.control.setValue([...new Set([...this.control.value, ...allValues])]);

    this.searchControl.setValue('');
    this.searchText.set('');

    this.autocompleteTrigger.closePanel();
  }

  clearAll() {
    if (this.readonly || this.disabled) return;
    this.control.setValue([]);
  }

  // ================= DRAG & DROP =================

  drop(event: CdkDragDrop<any>) {
    if (this.disabled || this.readonly) return;

    const current = [...this.control.value];
    moveItemInArray(current, event.previousIndex, event.currentIndex);
    this.control.setValue(current);
  }

  // ================= KEYBOARD =================

  onKeyDown(event: KeyboardEvent) {
    if (this.readonly || this.disabled) return;

    if (event.key === 'Backspace' && !this.searchText() && this.control.value.length > 0) {
      const updated = [...this.control.value];
      updated.pop();
      this.control.setValue(updated);
    }
  }

  // ================= CVA =================

  onChange: (value: string[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string[] | null): void {
    this.control.setValue(value ?? [], { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;

    isDisabled
      ? this.control.disable({ emitEvent: false })
      : this.control.enable({ emitEvent: false });

    this.stateChanges.next();
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick() {}

  ngOnDestroy() {
    this.stateChanges.complete();
  }
  trackByValue = (_: number, item: [string, string]) => item[0];
  openPanel() {
    this.autocompleteTrigger.openPanel();
    setTimeout(() => this.autocompleteTrigger.updatePosition());
  }
}
