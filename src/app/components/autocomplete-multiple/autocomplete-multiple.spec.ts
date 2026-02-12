import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteMultiple } from './autocomplete-multiple';

describe('AutocompleteMultiple', () => {
  let component: AutocompleteMultiple;
  let fixture: ComponentFixture<AutocompleteMultiple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteMultiple]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteMultiple);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
