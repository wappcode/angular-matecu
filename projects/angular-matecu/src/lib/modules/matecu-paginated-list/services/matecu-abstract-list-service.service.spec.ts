import { TestBed } from '@angular/core/testing';
import { EntityModel } from '../../matecu-remote-server/types/entity-model';

import { MatecuAbstractListServiceService } from './matecu-abstract-list-service.service';

describe('MatecuAbstractListServiceService', () => {
  let service: MatecuAbstractListServiceService<EntityModel>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatecuAbstractListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
