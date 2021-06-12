import { TestBed } from '@angular/core/testing';

import { RitService } from './rit.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RitService', () => {
  let service: RitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RitService]
    });
    service = TestBed.inject(RitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
