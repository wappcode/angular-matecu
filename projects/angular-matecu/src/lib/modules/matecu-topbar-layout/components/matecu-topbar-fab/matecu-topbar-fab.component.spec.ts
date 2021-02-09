import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuTopbarFabComponent } from './matecu-topbar-fab.component';

describe('MatecuTopbarFabComponent', () => {
  let component: MatecuTopbarFabComponent;
  let fixture: ComponentFixture<MatecuTopbarFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatecuTopbarFabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuTopbarFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
