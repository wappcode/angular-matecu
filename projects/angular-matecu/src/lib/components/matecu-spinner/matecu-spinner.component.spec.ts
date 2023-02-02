import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuSpinnerComponent } from './matecu-spinner.component';

describe('MatecuSpinnerComponent', () => {
  let component: MatecuSpinnerComponent;
  let fixture: ComponentFixture<MatecuSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatecuSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
