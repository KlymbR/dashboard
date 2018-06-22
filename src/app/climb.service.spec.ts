import { TestBed, inject } from '@angular/core/testing';

import { ClimbService } from './climb.service';

describe('ClimbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClimbService]
    });
  });

  it('should be created', inject([ClimbService], (service: ClimbService) => {
    expect(service).toBeTruthy();
  }));
});
