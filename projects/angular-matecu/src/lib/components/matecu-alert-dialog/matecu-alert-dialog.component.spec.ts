import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuAlertDialogComponent } from './matecu-alert-dialog.component';

describe('MatecuAlertDialogComponent', () => {
  let component: MatecuAlertDialogComponent;
  let fixture: ComponentFixture<MatecuAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatecuAlertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
