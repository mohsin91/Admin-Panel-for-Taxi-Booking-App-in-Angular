import { TestBed } from '@angular/core/testing';

import { EncryService } from './encry.service';

describe('EncryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncryService = TestBed.get(EncryService);
    expect(service).toBeTruthy();
  });
});
