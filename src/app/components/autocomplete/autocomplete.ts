import { Component, OnInit, signal } from '@angular/core';
import { MatecuAutocomplete } from '../../../../projects/angular-matecu/src/lib/components/matecu-autocomplete/matecu-autocomplete';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { MatecuAutocompleteOption } from '../../../../projects/angular-matecu/src/public-api';

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
export class Autocomplete implements OnInit {
  contriesBase: MatecuAutocompleteOption[] = [
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
  countries = signal<MatecuAutocompleteOption[]>([]);
  isLoading = signal(false);
  form = new FormGroup({
    country: new FormControl(''),
  });
  ngOnInit(): void {
    // const observable = new Subject<void>();
    setTimeout(() => {
      this.countries.update((current) => [...current, ...this.contriesBase]);
      // observable.next();
    }, 4000);
  }

  onSearch(search: string) {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      const filtered = this.contriesBase.filter((option) =>
        option[1].toLowerCase().includes(search.toLowerCase()),
      );
      const curent = search && search.trim().length > 0 ? filtered : this.contriesBase;
      this.countries.set(curent);
      console.log('search', search);
      console.log('current', curent);
      // this.countries.update((current) => [...current, ...this.contriesBase]);
    }, 5000);
  }

  onCreate(value: string) {
    const id = value.trim();
    this.contriesBase.push([id, value]);
    this.countries.set(this.contriesBase);
    this.form.get('country')?.setValue(id);
  }
}
