import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuCamaraInput } from './matecu-camara-input';

describe('MatecuCamaraInput', () => {
  let component: MatecuCamaraInput;
  let fixture: ComponentFixture<MatecuCamaraInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatecuCamaraInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatecuCamaraInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
