import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuTopbarLayoutComponent } from './matecu-topbar-layout.component';

describe('MatecuTopbarLayoutComponent', () => {
  let component: MatecuTopbarLayoutComponent;
  let fixture: ComponentFixture<MatecuTopbarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatecuTopbarLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuTopbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
