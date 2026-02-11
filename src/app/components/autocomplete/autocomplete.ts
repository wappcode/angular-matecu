import { Component } from '@angular/core';
import { MatecuAutocompleteInput } from '../../../../projects/angular-matecu/src/lib/components/matecu-autocomplete-input/matecu-autocomplete-input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-autocomplete',
  imports: [
    MatecuAutocompleteInput,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.scss',
})
export class Autocomplete {
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
  isLoading = false;
  form = new FormGroup({
    country: new FormControl(''),
  });

  onSearch(search: string) {
    console.log('Search:', search);
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  onCreate(value: string) {
    console.log('Create:', value);
  }
}
