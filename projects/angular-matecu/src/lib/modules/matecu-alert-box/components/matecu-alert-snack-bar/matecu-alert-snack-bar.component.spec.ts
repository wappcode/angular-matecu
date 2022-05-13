import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuAlertSnackBarComponent } from './matecu-alert-snack-bar.component';

describe('MatecuAlertSnackBarComponent', () => {
  let component: MatecuAlertSnackBarComponent;
  let fixture: ComponentFixture<MatecuAlertSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatecuAlertSnackBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuAlertSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
