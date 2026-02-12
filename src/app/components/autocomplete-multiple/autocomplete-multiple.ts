import { Component } from '@angular/core';
import { MatecuAutocompleteMultiple } from '../../../../projects/angular-matecu/src/lib/components/matecu-autocomplete-multiple/matecu-autocomplete-multiple';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autocomplete-multiple',
  imports: [MatecuAutocompleteMultiple, MatFormFieldModule, ReactiveFormsModule, CommonModule],
  templateUrl: './autocomplete-multiple.html',
  styleUrls: ['./autocomplete-multiple.scss'],
})
export class AutocompleteMultiple {
  control = new FormControl<string[]>([]);
  countries: [string, string][] = [
    ['cn', 'China'],
    ['us', 'United States'],
    ['jp', 'Japan'],
    ['de', 'Germany'],
    ['fr', 'France'],
    ['gb', 'United Kingdom'],
    ['it', 'Italy'],
    ['ca', 'Canada'],
    ['au', 'Australia'],
    ['br', 'Brazil'],
  ];
}
