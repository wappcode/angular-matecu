import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuTopbarBodyComponent } from './matecu-topbar-body.component';

describe('MatecuTopbarBodyComponent', () => {
  let component: MatecuTopbarBodyComponent;
  let fixture: ComponentFixture<MatecuTopbarBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatecuTopbarBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuTopbarBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
