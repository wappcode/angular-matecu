import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuTopbarHeaderRowComponent } from './matecu-topbar-header-row.component';

describe('MatecuTopbarRowComponent', () => {
  let component: MatecuTopbarHeaderRowComponent;
  let fixture: ComponentFixture<MatecuTopbarHeaderRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatecuTopbarHeaderRowComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatecuTopbarHeaderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
