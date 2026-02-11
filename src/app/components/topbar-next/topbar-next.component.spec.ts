import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarNextComponent } from './topbar-next.component';

describe('TopbarNextComponent', () => {
  let component: TopbarNextComponent;
  let fixture: ComponentFixture<TopbarNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarNextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopbarNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
