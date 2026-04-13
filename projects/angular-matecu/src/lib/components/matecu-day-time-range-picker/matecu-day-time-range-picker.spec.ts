import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuDayTimeRangePicker } from './matecu-day-time-range-picker';

describe('MatecuDayTimeRangePicker', () => {
  let component: MatecuDayTimeRangePicker;
  let fixture: ComponentFixture<MatecuDayTimeRangePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatecuDayTimeRangePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(MatecuDayTimeRangePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit range when date and times are selected', () => {
    spyOn(component.rangeChange, 'emit');

    const testDate = new Date('2024-04-10');
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0);
    const endTime = new Date();
    endTime.setHours(17, 30, 0, 0);

    component.onDateChange(testDate);
    component.onStartTimeChange(startTime);
    component.onEndTimeChange(endTime);

    expect(component.rangeChange.emit).toHaveBeenCalled();
  });

  it('should validate that end time is after start time', () => {
    const testDate = new Date('2024-04-10');
    testDate.setHours(9, 0, 0, 0);
    const endDate = new Date('2024-04-10');
    endDate.setHours(8, 0, 0, 0); // End before start

    const range = {
      startDate: testDate,
      endDate: endDate,
    };

    const mockControl = {
      value: range,
    } as any;

    const result = component.validate(mockControl);
    expect(result).toEqual({ invalidTimeOrder: true });
  });

  it('should return null for valid time range', () => {
    const startDate = new Date('2024-04-10');
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date('2024-04-10');
    endDate.setHours(17, 0, 0, 0);

    const range = {
      startDate: startDate,
      endDate: endDate,
    };

    const mockControl = {
      value: range,
    } as any;

    const result = component.validate(mockControl);
    expect(result).toBeNull();
  });
});
