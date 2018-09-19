import { TestBed, async, inject } from '@angular/core/testing';

import { AdministrationGuard } from './administration.guard';

describe('AdministrationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrationGuard]
    });
  });

  it('should ...', inject([AdministrationGuard], (guard: AdministrationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
