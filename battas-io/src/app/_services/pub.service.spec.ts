import { TestBed } from '@angular/core/testing';

import { PubService } from './pub.service';

describe('PubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PubService = TestBed.get(PubService);
    expect(service).toBeTruthy();
  });
});
