import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockAlertsComponent } from './stock-alerts.component';
import { StockAlertService } from '../../../core/services/stock-alert.service';
import { of, throwError } from 'rxjs';

describe('StockAlertsComponent', () => {
  let component: StockAlertsComponent;
  let fixture: ComponentFixture<StockAlertsComponent>;
  let stockAlertServiceSpy: jasmine.SpyObj<StockAlertService>;

  beforeEach(async () => {
    stockAlertServiceSpy = jasmine.createSpyObj('StockAlertService', ['getStockAlerts']);

    await TestBed.configureTestingModule({
      imports: [StockAlertsComponent],
      providers: [
        { provide: StockAlertService, useValue: stockAlertServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StockAlertsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch alerts on init', () => {
    stockAlertServiceSpy.getStockAlerts.and.returnValue(of([
      { productId: 1, productName: 'P1', warehouseName: 'W1', currentStock: 2, threshold: 5 }
    ]));
    fixture.detectChanges();
    expect(component.alerts.length).toBe(1);
    expect(component.loading).toBeFalse();
  });

  it('should handle fetch error', () => {
    stockAlertServiceSpy.getStockAlerts.and.returnValue(throwError(() => new Error('fail')));
    fixture.detectChanges();
    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });
});
