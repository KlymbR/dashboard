import { TestBed, inject } from '@angular/core/testing';

import { ShowcaseService } from './showcase.service';

describe('ShowcaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowcaseService]
    });
  });

  it('should be created', inject([ShowcaseService], (service: ShowcaseService) => {
    expect(service).toBeTruthy();
  }));
});
