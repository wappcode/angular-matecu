import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuAutocompleteMultiple } from './matecu-autocomplete-multiple';

describe('MatecuAutocompleteMultiple', () => {
  let component: MatecuAutocompleteMultiple;
  let fixture: ComponentFixture<MatecuAutocompleteMultiple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatecuAutocompleteMultiple]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatecuAutocompleteMultiple);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
