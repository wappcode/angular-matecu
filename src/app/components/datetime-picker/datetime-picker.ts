import { Component } from '@angular/core';
import { MatecuDatetimePicker } from '../../../../projects/angular-matecu/src/lib/components/matecu-datetime-picker/matecu-datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datetime-picker',
  imports: [
    MatecuDatetimePicker,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './datetime-picker.html',
  styleUrl: './datetime-picker.scss',
})
export class DatetimePicker {}
