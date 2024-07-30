import { TestBed } from '@angular/core/testing';

import { ChartSettingsServiceService } from './chart-settings-service.service';

describe('ChartSettingsServiceService', () => {
  let service: ChartSettingsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartSettingsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
