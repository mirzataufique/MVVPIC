import { TestBed } from '@angular/core/testing';

import { GenerateCSVService } from './generate-csv.service';

describe('GenerateCSVService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateCSVService = TestBed.get(GenerateCSVService);
    expect(service).toBeTruthy();
  });
});
