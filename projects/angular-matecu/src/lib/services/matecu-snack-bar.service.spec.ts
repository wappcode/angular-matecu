import { TestBed } from '@angular/core/testing';

import { MatecuSnackBarService } from './matecu-snack-bar.service';

describe('MatecuSnackBarService', () => {
  let service: MatecuSnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatecuSnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
