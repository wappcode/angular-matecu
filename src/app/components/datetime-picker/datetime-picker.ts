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
import { MatecuDatetimePicker } from '../../../../projects/angular-matecu/src/lib/components/matecu-datetime-picker/matecu-datetime-picker';

@Component({
  selector: 'app-datetime-picker',
  imports: [
    MatecuDatetimePicker,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './datetime-picker.html',
  styleUrl: './datetime-picker.scss',
})
export class DatetimePicker {
  form: FormGroup;

  constructor() {
    this.form = this.createForm();
  }
  private createForm(): FormGroup {
    const form = new FormGroup({
      input: new FormControl(null, [Validators.required]),
    });
    return form;
  }
}
