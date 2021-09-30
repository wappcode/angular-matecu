import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuTopbarSearchComponent } from './matecu-topbar-search.component';

describe('MatecuTopbarSearchComponent', () => {
  let component: MatecuTopbarSearchComponent;
  let fixture: ComponentFixture<MatecuTopbarSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatecuTopbarSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuTopbarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
