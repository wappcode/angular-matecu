import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTimeRangePicker } from './day-time-range-picker';

describe('DayTimeRangePicker', () => {
  let component: DayTimeRangePicker;
  let fixture: ComponentFixture<DayTimeRangePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayTimeRangePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(DayTimeRangePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with datetimeRange control', () => {
    expect(component.form.get('datetimeRange')).toBeTruthy();
  });

  it('should have required validation', () => {
    const control = component.form.get('datetimeRange');
    expect(control?.hasError('required')).toBeTruthy();
  });
});
