import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuTopbarRowComponent } from './matecu-topbar-row.component';

describe('MatecuTopbarRowComponent', () => {
  let component: MatecuTopbarRowComponent;
  let fixture: ComponentFixture<MatecuTopbarRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatecuTopbarRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatecuTopbarRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
