import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMatecuComponent } from './angular-matecu.component';

describe('AngularMatecuComponent', () => {
  let component: AngularMatecuComponent;
  let fixture: ComponentFixture<AngularMatecuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularMatecuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMatecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
