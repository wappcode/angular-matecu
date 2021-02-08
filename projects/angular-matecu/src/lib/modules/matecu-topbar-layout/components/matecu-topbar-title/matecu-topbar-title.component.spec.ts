import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuTopbarTitleComponent } from './matecu-topbar-title.component';

describe('MatecuTopbarTitleComponent', () => {
  let component: MatecuTopbarTitleComponent;
  let fixture: ComponentFixture<MatecuTopbarTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatecuTopbarTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuTopbarTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
