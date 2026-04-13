import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatecuDayTimeRangePicker } from '../../../../projects/angular-matecu/src/lib/components/matecu-day-time-range-picker/matecu-day-time-range-picker';

@Component({
  selector: 'app-day-time-range-picker',
  imports: [
    MatecuDayTimeRangePicker,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './day-time-range-picker.html',
  styleUrl: './day-time-range-picker.scss',
})
export class DayTimeRangePicker {
  form: FormGroup;

  constructor() {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    const form = new FormGroup({
      datetimeRange: new FormControl(null, [Validators.required]),
    });
    return form;
  }
}
