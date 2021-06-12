import { TestBed } from '@angular/core/testing';

import { RitService } from './rit.service';

describe('RitService', () => {
  let service: RitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
