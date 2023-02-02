import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuTopbarActionsComponent } from './matecu-topbar-action.component';

describe('MatecuTopbarActionsComponent', () => {
  let component: MatecuTopbarActionsComponent;
  let fixture: ComponentFixture<MatecuTopbarActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatecuTopbarActionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuTopbarActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
