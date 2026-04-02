import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
  ElementRef,
  DoCheck,
  Injector,
  input,
  computed,
  signal,
  effect,
  output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  NgControl,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldControl } from '@angular/material/form-field';
import {
  Observable,
  startWith,
  map,
  Subject,
  tap,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  filter,
} from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  MatecuAutocompleteFilterFn,
  MatecuAutocompleteOption,
} from '../../types/matecu-autocomplete';

@Component({
  selector: 'matecu-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './matecu-autocomplete.html',
  styleUrls: ['./matecu-autocomplete.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MatecuAutocomplete,
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: MatecuAutocomplete,
    },
  ],
})
export class MatecuAutocomplete
  implements
    ControlValueAccessor,
    MatFormFieldControl<string>,
    OnChanges,
    OnInit,
    OnDestroy,
    DoCheck
{
  static nextId = 0;
  options = input<MatecuAutocompleteOption[]>([]);
  allowCreate = input<boolean>(false);
  loading = input<boolean>(false);
  filterFn = input<MatecuAutocompleteFilterFn>(this.createFilterFn());
  searchChangeDebounceTime = input<number>(300);
  ngControl: NgControl | null = null;
  focused = false;
  lastSearchText: string | null = null;
  inputControl = new FormControl<string | null>(null);
  filteredOptions = computed<MatecuAutocompleteOption[]>(() => {
    const fieldValue = this.inputValueSignal() ?? '';
    const options = this.filter(fieldValue);
    return options;
  });

  readonly _disabled = signal(false);
  readonly _required = signal(false);
  readonly _readonly = signal(false);
  readonly _placeholder = signal('');
  readonly stateChanges = new Subject<void>();
  readonly id = `matecu-autocomplete-${MatecuAutocomplete.nextId++}`;
  readonly controlType = 'matecu-autocomplete';
  readonly autofilled = false;

  private destroy$ = new Subject<void>();
  private internalValue: string | null = null;
  private internalValueSignal = signal<string | null>(null);
  private inputValueSignal = signal<string | null>(null);
  private focusMonitor: FocusMonitor;
  private elementRef: ElementRef<HTMLElement>;
  private injector: Injector;
  private optionMap = new Map<string, string>();
  private onChange: any = () => {};
  private onTouched: any = () => {};

  @Input()
  get required(): boolean {
    return this._required();
  }
  set required(value: boolean) {
    this._required.set(value);
    this.stateChanges.next();
  }
  @Input()
  get readonly(): boolean {
    return this._readonly();
  }
  set readonly(value: boolean) {
    this._readonly.set(value);
    this.stateChanges.next();
  }
  @Input()
  get placeholder(): string {
    return this._placeholder();
  }
  set placeholder(value: string) {
    this._placeholder.set(value);
    this.stateChanges.next();
  }
  @Input()
  get disabled(): boolean {
    return this._disabled();
  }
  set disabled(value: boolean) {
    this._disabled.set(value);
    this.setDisabledState(value);
    this.stateChanges.next();
  }

  @Input()
  get value(): string | null {
    return this.internalValue;
  }
  set value(value: string | null) {
    this.writeValue(value);
    this.stateChanges.next();
  }

  searchChange = output<string>();
  create = output<string>();
  valueChange = output<string | null>();

  get empty(): boolean {
    const isEmpty = this.inputControl.value === '' || !this.inputControl.value;
    return isEmpty;
  }

  get shouldLabelFloat(): boolean {
    const shouldFloat = this.focused || !this.empty;
    return shouldFloat;
  }

  get errorState(): boolean {
    return !!(this.ngControl && this.ngControl.invalid && this.ngControl.touched);
  }
  showCreateOption = computed(() => {
    const value = this.lastSearchText;

    return (
      this.allowCreate() &&
      typeof value === 'string' &&
      value.trim() !== '' &&
      this.internalValueSignal() !== value &&
      this.options().some((option) => option[1].toLowerCase() === value.toLowerCase()) === false
    );
  });

  constructor(focusMonitor: FocusMonitor, elementRef: ElementRef<HTMLElement>, injector: Injector) {
    this.focusMonitor = focusMonitor;
    this.elementRef = elementRef;
    this.injector = injector;
    // Inicializar el signal con el valor inicial del inputControl
    this.inputValueSignal.set(this.inputControl.value);

    effect(() => {
      this.options();
      this.rebuildOptionMap();
      this.updateInputLabelFromValue();
      this.stateChanges.next();
    });
  }

  ngOnInit() {
    // Intentar obtener NgControl de forma segura
    try {
      this.ngControl = this.injector.get(NgControl, null);
    } catch (error) {
      // Ignorar si no se puede obtener NgControl
      this.ngControl = null;
    }
    this.inputControl.valueChanges
      .pipe(
        startWith(this.inputControl.value ?? ''),
        debounceTime(this.searchChangeDebounceTime()),
        distinctUntilChanged(),
        tap((value) => (this.lastSearchText = value ?? this.lastSearchText)),
        tap((value) => this.inputValueSignal.set(value)),
        tap((value) => this.searchChange.emit(value ?? '')),
        // InternalValueSingal se actualiza solo al seleccionar una opción, no al escribir en el input, por lo que aquí se compara con el valor del input para evitar emitir searchChange cuando se selecciona una opción
        filter((value) => this.internalValueSignal() !== value),
        tap(() => this.clearValue()),
        takeUntil(this.destroy$),
      )
      .subscribe();
    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((focused) => {
        if (!!focused !== this.focused) {
          this.focused = !!focused;
          this.stateChanges.next();
        }
      });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.destroy$.next();
    this.destroy$.complete();
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  ngDoCheck() {
    if (this.ngControl) {
      const newErrorState = !!(this.ngControl.invalid && this.ngControl.touched);
      if (newErrorState !== this.errorState) {
        this.stateChanges.next();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.rebuildOptionMap();
      this.updateInputLabelFromValue();
      this.stateChanges.next();
    }

    if (changes['placeholder']) {
      this.stateChanges.next();
    }
  }

  private filter(search: string): MatecuAutocompleteOption[] {
    return this.options().filter((option) => this.filterFn()(option[1], search));
  }

  private createFilterFn(): (v1: string, v2: string) => boolean {
    return (v1: string, v2: string): boolean => {
      return v1.toLowerCase().includes(v2.toLowerCase());
    };
  }

  displayLabel = (value: string | null): string => {
    if (value === null || value === undefined) return '';
    if (!Array.isArray(this.options())) {
      return '';
    }
    const mapValue = this.optionMap.get(value) ?? '';
    return mapValue;
  };

  onOptionSelected(value: string) {
    if (!value || this.readonly) {
      return;
    }
    this.internalValue = value;
    this.internalValueSignal.set(value);
    this.inputControl.setValue(value, { emitEvent: false });
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  onCreateClick() {
    if (
      !this.lastSearchText ||
      this.lastSearchText.trim() === '' ||
      this.options().some(
        (option) => option[1].toLowerCase() === this.lastSearchText!.toLowerCase(),
      )
    ) {
      return;
    }
    this.create.emit(this.lastSearchText);
  }

  private updateInputLabelFromValue() {
    if (this.internalValue !== null) {
      const label = this.displayLabel(this.internalValue);
      this.inputControl.setValue(label, { emitEvent: false });
    }
  }

  // ControlValueAccessor

  writeValue(value: string | null): void {
    this.internalValue = value;
    this.internalValueSignal.set(value);
    this.updateInputLabelFromValue();
    this.stateChanges.next();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
    this._disabled.set(isDisabled);
    this.stateChanges.next();
  }

  // MatFormFieldControl methods
  focus(options?: FocusOptions): void {
    this.elementRef.nativeElement.querySelector('input')?.focus(options);
  }

  onContainerClick(): void {
    this.focus();
  }

  setDescribedByIds(ids: string[]): void {
    const input = this.elementRef.nativeElement.querySelector('input');
    if (input) {
      input.setAttribute('aria-describedby', ids.join(' '));
    }
  }
  private rebuildOptionMap() {
    this.optionMap.clear();

    for (const [value, label] of this.options() ?? []) {
      this.optionMap.set(value, label);
    }
  }

  private clearValue() {
    this.internalValue = null;
    this.internalValueSignal.set(null);
    this.onChange(null);
    this.onTouched();
    this.valueChange.emit(null);
  }
}
