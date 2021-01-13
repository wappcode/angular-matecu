import { TestBed } from '@angular/core/testing';

import { AngularMatecuService } from './angular-matecu.service';

describe('AngularMatecuService', () => {
  let service: AngularMatecuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularMatecuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
