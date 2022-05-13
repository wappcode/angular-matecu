import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuSnackBarAlertComponent } from './matecu-snack-bar-alert.component';

describe('MatecuSnackBarAlertComponent', () => {
  let component: MatecuSnackBarAlertComponent;
  let fixture: ComponentFixture<MatecuSnackBarAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatecuSnackBarAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuSnackBarAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
