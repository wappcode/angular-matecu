import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatecuAlertBoxComponent } from './matecu-alert-box.component';

describe('MatecuAlertBoxComponent', () => {
  let component: MatecuAlertBoxComponent;
  let fixture: ComponentFixture<MatecuAlertBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatecuAlertBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuAlertBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
