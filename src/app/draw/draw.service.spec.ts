/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawService } from './draw.service';

describe('DrawService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawService]
    });
  });

  it('should ...', inject([DrawService], (service: DrawService) => {
    expect(service).toBeTruthy();
  }));
});
