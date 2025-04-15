import { TestBed } from '@angular/core/testing';

import { ChartOptionsService } from './chart-options.service';

describe('ChartOptionsService', () => {
  let service: ChartOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
