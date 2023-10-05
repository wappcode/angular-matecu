import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuTopbarHeaderColumnComponent } from './matecu-topbar-header-column.component';

describe('MatecuTopbarHeaderColumnComponent', () => {
  let component: MatecuTopbarHeaderColumnComponent;
  let fixture: ComponentFixture<MatecuTopbarHeaderColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatecuTopbarHeaderColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatecuTopbarHeaderColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
