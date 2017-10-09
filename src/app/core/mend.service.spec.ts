import { TestBed, inject } from '@angular/core/testing';

import { MendService } from './mend.service';

describe('MendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MendService]
    });
  });

  it('should be created', inject([MendService], (service: MendService) => {
    expect(service).toBeTruthy();
  }));
});
