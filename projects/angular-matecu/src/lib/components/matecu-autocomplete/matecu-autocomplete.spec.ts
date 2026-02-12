import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuAutocomplete } from './matecu-autocomplete';

describe('MatecuAutocomplete', () => {
  let component: MatecuAutocomplete;
  let fixture: ComponentFixture<MatecuAutocomplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatecuAutocomplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatecuAutocomplete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
