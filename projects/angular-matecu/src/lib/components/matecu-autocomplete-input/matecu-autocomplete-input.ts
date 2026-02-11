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
import { Observable, startWith, map, Subject, tap, combineLatest } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

/**
 * [value,label]
 */
export type MatecuAutocompleteOption = [string, string];
export type MatecuAutocompleteFilterFn = (optionLabel: string, search: string) => boolean;
@Component({
  selector: 'matecu-autocomplete-input',
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './matecu-autocomplete-input.html',
  styleUrl: './matecu-autocomplete-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MatecuAutocompleteInput,
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: MatecuAutocompleteInput,
    },
  ],
})
export class MatecuAutocompleteInput
  implements
    ControlValueAccessor,
    MatFormFieldControl<string>,
    OnChanges,
    OnInit,
    OnDestroy,
    DoCheck
{
  @Input() options: MatecuAutocompleteOption[] = [];
  @Input() allowCreate = false;
  @Input() loading = false;
  @Input() filterFn: MatecuAutocompleteFilterFn = this.createFilterFn();

  // MatFormFieldControl inputs
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder = '';

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.setDisabledState(this._disabled);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): string | null {
    return this.internalValue;
  }
  set value(value: string | null) {
    this.writeValue(value);
    this.stateChanges.next();
  }

  @Output() searchChange = new EventEmitter<string>();
  @Output() create = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string | null>();

  // MatFormFieldControl properties
  static nextId = 0;
  readonly stateChanges = new Subject<void>();
  readonly id = `matecu-autocomplete-input-${MatecuAutocompleteInput.nextId++}`;
  ngControl: NgControl | null = null;
  focused = false;
  lastSearchText: string | null = null;
  readonly controlType = 'matecu-autocomplete-input';
  readonly autofilled = false;

  inputControl = new FormControl<string | null>(null);
  filteredOptions$!: Observable<MatecuAutocompleteOption[]>;

  private internalValue: string | null = null;
  private focusMonitor: FocusMonitor;
  private elementRef: ElementRef<HTMLElement>;
  private injector: Injector;
  private optionMap = new Map<string, string>();

  private onChange: any = () => {};
  private onTouched: any = () => {};
  get empty(): boolean {
    return this.inputControl.value === '' || !this.inputControl.value;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  get errorState(): boolean {
    return !!(this.ngControl && this.ngControl.invalid && this.ngControl.touched);
  }
  get showCreateOption(): boolean {
    const value = this.inputControl.value;

    return (
      this.allowCreate &&
      typeof value === 'string' &&
      this.internalValue !== value &&
      this.options.some((option) => option[1].toLowerCase() === value.toLowerCase()) === false
      // !(this.filteredOptions$ | async)?.length
    );
  }

  constructor(focusMonitor: FocusMonitor, elementRef: ElementRef<HTMLElement>, injector: Injector) {
    this.focusMonitor = focusMonitor;
    this.elementRef = elementRef;
    this.injector = injector;
  }

  ngOnInit() {
    // Intentar obtener NgControl de forma segura
    try {
      this.ngControl = this.injector.get(NgControl, null);
    } catch (error) {
      // Ignorar si no se puede obtener NgControl
      this.ngControl = null;
    }

    const value$ = this.inputControl.valueChanges.pipe(startWith(this.inputControl.value ?? ''));

    this.filteredOptions$ = combineLatest([value$]).pipe(
      map(([value]) => this.filter(value ?? '')),
    );

    this.inputControl.valueChanges
      .pipe(
        // Almacena el último valor valido para la búsqueda esto se utiliza para enviar una emición para crear un elemento
        tap((value) => (this.lastSearchText = value ?? this.lastSearchText)),
        // CUando se escribe algo se limpian los valores seleccionados para que el usuario pueda seleccionar una opción o crear una nueva
        tap(() => this.clearValue()),
      )
      .subscribe((value) => {
        queueMicrotask(() => {
          this.searchChange.emit(value ?? '');
        });
      });

    this.focusMonitor.monitor(this.elementRef, true).subscribe((focused) => {
      if (!!focused !== this.focused) {
        this.focused = !!focused;
        this.stateChanges.next();
      }
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
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

    if (changes['placeholder'] || changes['required'] || changes['disabled']) {
      this.stateChanges.next();
    }
  }

  private filter(search: string): MatecuAutocompleteOption[] {
    return this.options.filter((option) => this.filterFn(option[1], search));
  }

  private createFilterFn(): (v1: string, v2: string) => boolean {
    return (v1: string, v2: string): boolean => {
      return v1.toLowerCase().includes(v2.toLowerCase());
    };
  }

  displayLabel = (value: string | null): string => {
    if (value === null || value === undefined) return '';

    if (!Array.isArray(this.options)) {
      return '';
    }
    return this.optionMap.get(value) ?? '';
  };

  onOptionSelected(value: string) {
    if (!value) {
      return;
    }
    this.internalValue = value;
    this.inputControl.setValue(value, { emitEvent: false });
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  onCreateClick() {
    if (
      !this.lastSearchText ||
      this.lastSearchText.trim() === '' ||
      this.options.some(
        (option) => option[1].toLowerCase() === this.lastSearchText!.toLowerCase(),
      ) ||
      this.options.some((option) => option[1].toLowerCase() === this.lastSearchText!.toLowerCase())
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
    this._disabled = isDisabled;
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
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

    for (const [value, label] of this.options ?? []) {
      this.optionMap.set(value, label);
    }
  }

  private clearValue() {
    this.internalValue = null;
    this.onChange(null);
    this.onTouched();
    this.valueChange.emit(null);
  }
}
