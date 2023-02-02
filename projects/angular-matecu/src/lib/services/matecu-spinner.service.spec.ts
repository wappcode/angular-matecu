import { TestBed } from '@angular/core/testing';

import { MatecuSpinnerService } from './matecu-spinner.service';

describe('MatecuSpinnerService', () => {
  let service: MatecuSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatecuSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
