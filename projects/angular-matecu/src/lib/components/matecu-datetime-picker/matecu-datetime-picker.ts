import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule, MatTimepickerOption } from '@angular/material/timepicker';

@Component({
  selector: 'matecu-datetime-picker',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './matecu-datetime-picker.html',
  styleUrls: ['./matecu-datetime-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MatecuDatetimePicker,
      multi: true,
    },
  ],
})
export class MatecuDatetimePicker implements ControlValueAccessor {
  value: Date | null = null;
  disabled = false;

  @Input() dateLabel = 'Select date';
  @Input() timeLabel = 'Select time';
  @Input() apparance: MatFormFieldAppearance = 'fill';
  @Input() matTimepickerMin: string | null = null;
  @Input() matTimepickerMax: string | null = null;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() timeInterval: string | null = null;
  @Input() timeOptions: MatTimepickerOption<Date>[] | null = null;
  @Input() matDatepickerFilter: ((d: Date | null) => boolean) | null = null;

  @Output() valueChange = new EventEmitter<Date | null>();

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Date | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: Date | null): void {
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  onBlur(): void {
    this.onTouched();
  }
  onDateChange(value: Date | null) {
    if (this.validateDateObject(value) && this.validateDateObject(this.value)) {
      value!.setHours(this.value!.getHours());
      value!.setMinutes(this.value!.getMinutes());
      value!.setSeconds(this.value!.getSeconds());
    } else if (!this.validateDateObject(value)) {
      this.onValueChange(null);
    } else {
      this.onValueChange(value);
    }
  }

  private validateDateObject(date: unknown): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
}
