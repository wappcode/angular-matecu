import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuAutocompleteInput } from './matecu-autocomplete-input';

describe('MatecuAutocompleteInput', () => {
  let component: MatecuAutocompleteInput;
  let fixture: ComponentFixture<MatecuAutocompleteInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatecuAutocompleteInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatecuAutocompleteInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
