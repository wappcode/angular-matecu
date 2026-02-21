import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuDatetimePicker } from './matecu-datetime-picker';

describe('MatecuDatetimePicker', () => {
  let component: MatecuDatetimePicker;
  let fixture: ComponentFixture<MatecuDatetimePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatecuDatetimePicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatecuDatetimePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
