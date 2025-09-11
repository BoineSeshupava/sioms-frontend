import { TestBed } from '@angular/core/testing';

import { StockAlertService } from './stock-alert.service';

describe('StockAlertService', () => {
  let service: StockAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
