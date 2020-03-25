import { TestBed } from '@angular/core/testing';

import { MainControllerService} from './mainController.service';

describe('MainServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainControllerService = TestBed.get(MainControllerService);
    expect(service).toBeTruthy();
  });
});
