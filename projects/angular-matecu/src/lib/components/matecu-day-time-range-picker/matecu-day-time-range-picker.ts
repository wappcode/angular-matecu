import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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

export interface DatetimeRange {
  startDate: Date | null;
  endDate: Date | null;
}

@Component({
  selector: 'matecu-day-time-range-picker',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './matecu-day-time-range-picker.html',
  styleUrls: ['./matecu-day-time-range-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MatecuDayTimeRangePicker,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: MatecuDayTimeRangePicker,
      multi: true,
    },
  ],
})
export class MatecuDayTimeRangePicker implements ControlValueAccessor, Validator {
  selectedDate: Date | null = null;
  startTime: Date | null = null;
  endTime: Date | null = null;
  disabled = false;

  dateLabel = input('Select date');
  startTimeLabel = input('Start time');
  endTimeLabel = input('End time');
  appearance = input<MatFormFieldAppearance>('fill');
  startTimeMin = input<string | null>(null);
  startTimeMax = input<string | null>(null);
  endTimeMin = input<string | null>(null);
  endTimeMax = input<string | null>(null);
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);
  timeInterval = input<string | null>(null);
  startTimeOptions = input<MatTimepickerOption<Date>[] | null>(null);
  endTimeOptions = input<MatTimepickerOption<Date>[] | null>(null);
  matDatepickerFilter = input<((d: Date | null) => boolean) | null>(null);

  valueChange = output<DatetimeRange | null>();

  private onChange: (value: DatetimeRange | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: DatetimeRange | null): void {
    if (value) {
      this.selectedDate = value.startDate;
      this.startTime = value.startDate;
      this.endTime = value.endDate;
    } else {
      this.selectedDate = null;
      this.startTime = null;
      this.endTime = null;
    }
  }

  registerOnChange(fn: (value: DatetimeRange | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateChange(selectedDate: Date | null): void {
    this.selectedDate = selectedDate;
    this.updateDateRange();
  }

  onStartTimeChange(startTime: Date | null): void {
    this.startTime = startTime;
    this.updateDateRange();
  }

  onEndTimeChange(endTime: Date | null): void {
    this.endTime = endTime;
    this.updateDateRange();
  }

  onBlur(): void {
    this.onTouched();
  }

  private updateDateRange(): void {
    if (!this.selectedDate) {
      this.onChange(null);
      this.valueChange.emit(null);
      return;
    }

    const startDate = this.createDateTime(this.selectedDate, this.startTime);
    const endDate = this.createDateTime(this.selectedDate, this.endTime);

    if (!startDate || !endDate) {
      this.onChange(null);
      this.valueChange.emit(null);
      return;
    }

    const range: DatetimeRange = {
      startDate,
      endDate,
    };

    this.onChange(range);
    this.valueChange.emit(range);
  }

  private createDateTime(date: Date, time: Date | null): Date | null {
    if (!date || !time) {
      return null;
    }

    const result = new Date(date);
    result.setHours(time.getHours());
    result.setMinutes(time.getMinutes());
    result.setSeconds(time.getSeconds());
    result.setMilliseconds(time.getMilliseconds());

    return result;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const range = control.value as DatetimeRange;

    if (!range.startDate && !range.endDate) {
      return null;
    }

    // Validar que ambas fechas estén presentes si una está presente
    if ((range.startDate && !range.endDate) || (!range.startDate && range.endDate)) {
      return { incompleteRange: true };
    }

    if (!range.startDate || !range.endDate) {
      return null;
    }

    if (!this.validateDateObject(range.startDate) || !this.validateDateObject(range.endDate)) {
      return { invalidDate: true };
    }

    // Validar que la fecha de inicio sea anterior a la fecha final
    if (range.startDate >= range.endDate) {
      return { invalidTimeOrder: true };
    }

    // Validar fechas mínimas y máximas
    const minDate = this.minDate();
    if (minDate) {
      if (range.startDate < minDate || range.endDate < minDate) {
        return { minDate: { min: minDate, actual: range.startDate } };
      }
    }

    const maxDate = this.maxDate();
    if (maxDate) {
      if (range.startDate > maxDate || range.endDate > maxDate) {
        return { maxDate: { max: maxDate, actual: range.startDate } };
      }
    }

    // Validar tiempos mínimos y máximos para hora inicial
    const startTimeMin = this.startTimeMin();
    if (startTimeMin) {
      const minTimeError = this.validateTimeRange(range.startDate, startTimeMin, 'min');
      if (minTimeError) {
        return { startTimeMin: minTimeError };
      }
    }

    const startTimeMax = this.startTimeMax();
    if (startTimeMax) {
      const maxTimeError = this.validateTimeRange(range.startDate, startTimeMax, 'max');
      if (maxTimeError) {
        return { startTimeMax: maxTimeError };
      }
    }

    // Validar tiempos mínimos y máximos para hora final
    const endTimeMin = this.endTimeMin();
    if (endTimeMin) {
      const minTimeError = this.validateTimeRange(range.endDate, endTimeMin, 'min');
      if (minTimeError) {
        return { endTimeMin: minTimeError };
      }
    }

    const endTimeMax = this.endTimeMax();
    if (endTimeMax) {
      const maxTimeError = this.validateTimeRange(range.endDate, endTimeMax, 'max');
      if (maxTimeError) {
        return { endTimeMax: maxTimeError };
      }
    }

    return null;
  }

  private validateTimeRange(
    date: Date,
    timeStr: string,
    type: 'min' | 'max',
  ): ValidationErrors | null {
    const { hours, minutes } = this.parseTimeString(timeStr);
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes();

    const timeBoundary = hours * 60 + minutes;
    const dateTime = dateHours * 60 + dateMinutes;

    if (type === 'min' && dateTime < timeBoundary) {
      return {
        timeRange: {
          boundary: timeStr,
          actual: this.formatTime(dateHours, dateMinutes),
          type,
        },
      };
    }

    if (type === 'max' && dateTime > timeBoundary) {
      return {
        timeRange: {
          boundary: timeStr,
          actual: this.formatTime(dateHours, dateMinutes),
          type,
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

  private validateDateObject(date: unknown): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
}
