import { TestBed, inject } from '@angular/core/testing';

import { SimService } from './sim.service';

describe('SimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimService]
    });
  });

  it('should be created', inject([SimService], (service: SimService) => {
    expect(service).toBeTruthy();
  }));
});
