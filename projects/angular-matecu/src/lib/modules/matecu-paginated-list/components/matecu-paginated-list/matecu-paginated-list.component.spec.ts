import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityModel } from '../../../matecu-remote-server/types/entity-model';

import { MatecuPaginatedListComponent } from './matecu-paginated-list.component';


describe('MatecuPaginatedListComponent', () => {
  let component: MatecuPaginatedListComponent<EntityModel>;
  let fixture: ComponentFixture<MatecuPaginatedListComponent<EntityModel>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatecuPaginatedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatecuPaginatedListComponent) as ComponentFixture<MatecuPaginatedListComponent<EntityModel>>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
