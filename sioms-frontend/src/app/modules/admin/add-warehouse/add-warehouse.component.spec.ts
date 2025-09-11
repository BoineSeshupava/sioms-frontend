import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWarehouseComponent } from './add-warehouse.component';
import { WarehouseService } from '../../../core/services/warehouse.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('AddWarehouseComponent', () => {
  let component: AddWarehouseComponent;
  let fixture: ComponentFixture<AddWarehouseComponent>;
  let warehouseServiceSpy: jasmine.SpyObj<WarehouseService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    warehouseServiceSpy = jasmine.createSpyObj('WarehouseService', ['addWarehouse']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AddWarehouseComponent, ReactiveFormsModule],
      providers: [
        { provide: WarehouseService, useValue: warehouseServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form with controls', () => {
    expect(component.form.contains('name')).toBeTrue();
    expect(component.form.contains('location')).toBeTrue();
  });

  it('should call addWarehouse on submit', () => {
    component.form.setValue({ name: 'W1', location: 'Loc1' });
    warehouseServiceSpy.addWarehouse.and.returnValue(of({ id: 1, name: 'W1', location: 'Loc1' }));
    component.onSubmit();
    expect(warehouseServiceSpy.addWarehouse).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['admin/warehouse-list']);
  });

  it('should handle addWarehouse error', () => {
    component.form.setValue({ name: 'W1', location: 'Loc1' });
    warehouseServiceSpy.addWarehouse.and.returnValue(throwError(() => new Error('fail')));
    component.onSubmit();
    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });
});
