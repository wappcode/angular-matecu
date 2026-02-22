import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
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
    {
      provide: NG_VALIDATORS,
      useExisting: MatecuDatetimePicker,
      multi: true,
    },
  ],
})
export class MatecuDatetimePicker implements ControlValueAccessor, Validator {
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

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    if (!this.validateDateObject(control.value)) {
      return { invalidDate: true };
    }

    const dateValue = control.value as Date;

    if (this.minDate && dateValue < this.minDate) {
      return { minDate: { min: this.minDate, actual: dateValue } };
    }

    if (this.maxDate && dateValue > this.maxDate) {
      return { maxDate: { max: this.maxDate, actual: dateValue } };
    }

    // Validar tiempo mínimo
    if (this.matTimepickerMin) {
      const minTimeError = this.validateMinTime(dateValue, this.matTimepickerMin);
      if (minTimeError) {
        return minTimeError;
      }
    }

    // Validar tiempo máximo
    if (this.matTimepickerMax) {
      const maxTimeError = this.validateMaxTime(dateValue, this.matTimepickerMax);
      if (maxTimeError) {
        return maxTimeError;
      }
    }

    // Validar contra timeOptions si están disponibles
    if (this.timeOptions && this.timeOptions.length > 0) {
      const timeOptionsError = this.validateTimeOptions(dateValue, this.timeOptions);
      if (timeOptionsError) {
        return timeOptionsError;
      }
    }

    return null;
  }

  private validateMinTime(date: Date, minTimeStr: string): ValidationErrors | null {
    const { hours: minHours, minutes: minMinutes } = this.parseTimeString(minTimeStr);
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes();

    const minTotalMinutes = minHours * 60 + minMinutes;
    const dateTotalMinutes = dateHours * 60 + dateMinutes;

    if (dateTotalMinutes < minTotalMinutes) {
      return { minTime: { min: minTimeStr, actual: this.formatTime(dateHours, dateMinutes) } };
    }

    return null;
  }

  private validateMaxTime(date: Date, maxTimeStr: string): ValidationErrors | null {
    const { hours: maxHours, minutes: maxMinutes } = this.parseTimeString(maxTimeStr);
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes();

    const maxTotalMinutes = maxHours * 60 + maxMinutes;
    const dateTotalMinutes = dateHours * 60 + dateMinutes;

    if (dateTotalMinutes > maxTotalMinutes) {
      return { maxTime: { max: maxTimeStr, actual: this.formatTime(dateHours, dateMinutes) } };
    }

    return null;
  }

  private validateTimeOptions(
    date: Date,
    timeOptions: MatTimepickerOption<Date>[],
  ): ValidationErrors | null {
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes();
    const dateTotalMinutes = dateHours * 60 + dateMinutes;

    const isValidOption = timeOptions.some((option) => {
      if (!option.value || !(option.value instanceof Date)) {
        return false;
      }
      const optionHours = option.value.getHours();
      const optionMinutes = option.value.getMinutes();
      const optionTotalMinutes = optionHours * 60 + optionMinutes;

      return dateTotalMinutes === optionTotalMinutes;
    });

    if (!isValidOption) {
      return {
        invalidTimeOption: {
          available: timeOptions.map((o) =>
            this.formatTime(o.value?.getHours() || 0, o.value?.getMinutes() || 0),
          ),
        },
      };
    }

    return null;
  }

  private parseTimeString(timeStr: string): { hours: number; minutes: number } {
    const [hoursStr, minutesStr] = timeStr.split(':');
    return {
      hours: parseInt(hoursStr, 10) || 0,
      minutes: parseInt(minutesStr, 10) || 0,
    };
  }

  private formatTime(hours: number, minutes: number): string {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  onDateChange(value: Date | null) {
    if (this.validateDateObject(value) && this.validateDateObject(this.value)) {
      value!.setHours(this.value!.getHours());
      value!.setMinutes(this.value!.getMinutes());
      value!.setSeconds(this.value!.getSeconds());
    }
    this.onValueChange(value);
  }

  private validateDateObject(date: unknown): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
}
