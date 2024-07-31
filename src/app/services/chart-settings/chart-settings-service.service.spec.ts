import { TestBed } from '@angular/core/testing';

import { ChartSettingsService } from './chart-settings-service.service';

describe('ChartSettingsServiceService', () => {
  let service: ChartSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
