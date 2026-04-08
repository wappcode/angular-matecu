import {
  Component,
  computed,
  forwardRef,
  Injector,
  input,
  OnDestroy,
  OnInit,
  signal,
  output,
} from '@angular/core';

import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';

import { ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatecuAutocompleteFilterFn,
  MatecuAutocompleteOption,
} from '../../types/matecu-autocomplete';
import { MatecuAutocomplete } from '../matecu-autocomplete/matecu-autocomplete';

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
    ScrollingModule,
    MatButtonModule,
    MatTooltipModule,
    MatecuAutocomplete,
    FormsModule,
    ReactiveFormsModule,
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

  protected _placeholder = input('');
  loading = input(false);
  readonly = input(false);
  showTooltip = input(true);
  allowCreate = input(false);
  filterFn = input<MatecuAutocompleteFilterFn>(this.createFilterFn());
  options = input.required<MatecuAutocompleteOption[]>();

  // MatFormFieldControl compatibility
  get placeholder(): string {
    return this._placeholder();
  }

  // ================= OUTPUT =================

  searchChange = output<string | undefined | null>();
  valueChange = output<string[] | null>();

  // ================= INTERNAL CONTROL =================

  control = new FormControl<string[]>([], { nonNullable: true });
  controlValue$ = toSignal(this.control.valueChanges);
  searchControl = new FormControl<string>('', { nonNullable: true });
  @ViewChild(MatecuAutocomplete)
  matecuAutocomplete!: MatecuAutocomplete;

  // ================= SIGNALS =================

  readonly searchText = signal<string>(''); // 🔥 AHORA SÍ existe correctamente

  readonly filteredOptions = computed(() => {
    const filter = this.searchText();
    const filtered = this.options().filter((o) => !this.control.value.includes(o[0]));
    return filtered;
  });

  readonly selectedItems = computed(() => {
    const values = this.controlValue$() ?? [];
    return values.map((v) => {
      const found = this.options().find((o) => o[0] === v);
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

    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.onChange(value);
      this.valueChange.emit(value);
      this.stateChanges.next();
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

  selectOption(value: string | null) {
    if (this.readonly() || this.disabled) return;
    if (value === null) return;
    if (!this.control.value.includes(value)) {
      const option = this.options().find((o) => o[0] === value);
      if (option) {
        this.control.setValue([...this.control.value, value]);
      }
    }

    // limpiar input correctamente
    this.searchControl.setValue('');
    this.searchText.set('');

    // cerrar panel
    this.matecuAutocomplete.autocompleteTrigger.closePanel();
  }

  displayLabel(option: [string, string]): string {
    return Array.isArray(option) ? option[1] : '';
  }

  // ================= CHIP ACTIONS =================

  remove(value: string) {
    if (this.readonly() || this.disabled) return;

    this.control.setValue(this.control.value.filter((v) => v !== value));
  }

  selectAll() {
    if (this.readonly() || this.disabled) return;

    const allValues = this.options().map((o) => o[0]);

    this.control.setValue([...new Set([...this.control.value, ...allValues])]);

    this.searchControl.setValue('');
    this.searchText.set('');

    this.matecuAutocomplete.autocompleteTrigger.closePanel();
  }
  clearAll(): void {
    if (this.disabled || this.readonly()) return;

    if (this.control.value.length === 0) return;

    this.control.setValue([]);
    this.searchControl.setValue('');
    this.searchText.set('');

    this.matecuAutocomplete.autocompleteTrigger.closePanel();
  }

  onSearchText(text?: string) {
    this.searchText.set(text ?? '');
    this.searchChange.emit(text);
  }

  // ================= DRAG & DROP =================

  drop(event: CdkDragDrop<any>) {
    if (this.disabled || this.readonly()) return;

    const current = [...this.control.value];
    moveItemInArray(current, event.previousIndex, event.currentIndex);
    this.control.setValue(current);
  }

  // ================= KEYBOARD =================

  onKeyDown(event: KeyboardEvent) {
    if (this.readonly() || this.disabled) return;
    const searchText = this.searchText();
    if (
      event.key === 'Backspace' &&
      (!searchText || searchText === '') &&
      this.control.value.length > 0
    ) {
      const updated = [...this.control.value];
      updated.pop();
      this.control.setValue(updated);
    }
  }

  // ================= CVA =================

  onChange: (value: string[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string[] | null): void {
    this.control.setValue(value ?? [], { emitEvent: true });
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
    this.matecuAutocomplete.autocompleteTrigger.openPanel();
    setTimeout(() => this.matecuAutocomplete.autocompleteTrigger.updatePosition());
  }
  private createFilterFn(): (v1: string, v2: string) => boolean {
    return (v1: string, v2: string): boolean => {
      return v1.toLowerCase().includes(v2.toLowerCase());
    };
  }
}
