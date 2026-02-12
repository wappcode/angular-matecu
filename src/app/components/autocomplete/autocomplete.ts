import { Component, signal } from '@angular/core';
import { MatecuAutocomplete } from '../../../../projects/angular-matecu/src/lib/components/matecu-autocomplete/matecu-autocomplete';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autocomplete',
  imports: [
    MatecuAutocomplete,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './autocomplete.html',
  styleUrls: ['./autocomplete.scss'],
})
export class Autocomplete {
  countries = signal<[string, string][]>([
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
  ]);
  isLoading = signal(false);
  form = new FormGroup({
    country: new FormControl(''),
  });

  onSearch(search: string) {
    console.log('Search:', search);
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 300);
  }

  onCreate(value: string) {
    console.log('Create:', value);
    const id = value.trim();
    this.countries.update((current) => [[id, value], ...current]);
    this.form.get('country')?.setValue(id);
  }
}
