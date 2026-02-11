import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, startWith, map } from 'rxjs';

type Option = [string, string];

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
  styleUrl: './matecu-autocomplete-input.css',
  hostDirectives: [MatInput],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MatecuAutocompleteInput,
      multi: true,
    },
  ],
})
export class MatecuAutocompleteInput implements ControlValueAccessor, OnChanges, OnInit {
  @Input() options: Option[] = [];
  @Input() allowCreate = false;
  @Input() loading = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() create = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();

  inputControl = new FormControl<string | null>(null);
  filteredOptions$!: Observable<Option[]>;

  private internalValue: string | null = null;

  ngOnInit() {
    this.filteredOptions$ = this.inputControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value ?? '')),
    );

    this.inputControl.valueChanges.subscribe((value) => {
      queueMicrotask(() => {
        this.searchChange.emit(value ?? '');
      });
    });
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.updateInputLabelFromValue();
    }
  }

  private filter(search: string): Option[] {
    const lower = search.toLowerCase();
    return this.options.filter((option) => option[1].toLowerCase().includes(lower));
  }

  displayLabel = (value: string | null): string => {
    if (value === null || value === undefined) return '';

    if (!Array.isArray(this.options)) {
      return '';
    }

    const found = this.options.find((o) => o[0] === value);
    return found ? found[1] : '';
  };

  onOptionSelected(value: string) {
    this.internalValue = value;
    this.inputControl.setValue(value, { emitEvent: false });

    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  onCreateClick(text: string) {
    this.create.emit(text);
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
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }

  private onChange: any = () => {};
  private onTouched: any = () => {};
}
