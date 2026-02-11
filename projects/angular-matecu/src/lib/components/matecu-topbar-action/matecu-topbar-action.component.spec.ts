import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuTopbarActionComponent } from './matecu-topbar-action.component';

describe('MatecuTopbarActionsComponent', () => {
  let component: MatecuTopbarActionComponent;
  let fixture: ComponentFixture<MatecuTopbarActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatecuTopbarActionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuTopbarActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
