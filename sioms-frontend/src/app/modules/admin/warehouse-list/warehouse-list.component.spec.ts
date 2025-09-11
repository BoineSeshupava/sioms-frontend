import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarehouseListComponent } from './warehouse-list.component';
import { WarehouseService } from '../../../core/services/warehouse.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('WarehouseListComponent', () => {
  let component: WarehouseListComponent;
  let fixture: ComponentFixture<WarehouseListComponent>;
  let warehouseServiceSpy: jasmine.SpyObj<WarehouseService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    warehouseServiceSpy = jasmine.createSpyObj('WarehouseService', ['getWarehouses', 'deleteWarehouse']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [WarehouseListComponent],
      providers: [
        { provide: WarehouseService, useValue: warehouseServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WarehouseListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch warehouses on init', () => {
    warehouseServiceSpy.getWarehouses.and.returnValue(of([{ id: 1, name: 'Main', location: 'NY' }]));
    fixture.detectChanges();
    expect(component.warehouses.length).toBe(1);
    expect(component.loading).toBeFalse();
  });

  it('should handle fetch error', () => {
    warehouseServiceSpy.getWarehouses.and.returnValue(throwError(() => new Error('fail')));
    fixture.detectChanges();
    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });

  it('should navigate to add-warehouse', () => {
    component.onAdd();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['admin/add-warehouse']);
  });

  it('should navigate to edit-warehouse', () => {
    component.onEdit(2);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['admin/edit-warehouse', 2]);
  });

  it('should delete warehouse and refresh', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    warehouseServiceSpy.deleteWarehouse.and.returnValue(of(void 0));
    warehouseServiceSpy.getWarehouses.and.returnValue(of([]));
    component.fetchWarehouses = jasmine.createSpy();
    component.onDelete(1);
    expect(warehouseServiceSpy.deleteWarehouse).toHaveBeenCalledWith(1);
  });
});
