import { TestBed } from '@angular/core/testing';

import { VerseService } from './verse.service';

describe('VerseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerseService = TestBed.get(VerseService);
    expect(service).toBeTruthy();
  });
});
