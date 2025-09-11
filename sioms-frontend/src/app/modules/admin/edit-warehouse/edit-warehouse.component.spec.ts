import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditWarehouseComponent } from './edit-warehouse.component';
import { WarehouseService } from '../../../core/services/warehouse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('EditWarehouseComponent', () => {
  let component: EditWarehouseComponent;
  let fixture: ComponentFixture<EditWarehouseComponent>;
  let warehouseServiceSpy: jasmine.SpyObj<WarehouseService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    warehouseServiceSpy = jasmine.createSpyObj('WarehouseService', ['getWarehouse', 'updateWarehouse']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = {
      snapshot: { paramMap: { get: () => '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [EditWarehouseComponent, ReactiveFormsModule],
      providers: [
        { provide: WarehouseService, useValue: warehouseServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditWarehouseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load warehouse on init', () => {
    warehouseServiceSpy.getWarehouse.and.returnValue(of({ id: 1, name: 'W1', location: 'Loc1' }));
    component.ngOnInit();
    expect(component.form.value.name).toBe('W1');
    expect(component.loading).toBeFalse();
  });

  it('should handle load error', () => {
    warehouseServiceSpy.getWarehouse.and.returnValue(throwError(() => new Error('fail')));
    component.ngOnInit();
    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });

  it('should call updateWarehouse on submit', () => {
    component.form.setValue({ id: 1, name: 'W1', location: 'Loc1' });
    warehouseServiceSpy.updateWarehouse.and.returnValue(of(void 0));
    component.onSubmit();
    expect(warehouseServiceSpy.updateWarehouse).toHaveBeenCalledWith(1, { id: 1, name: 'W1', location: 'Loc1' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['admin/warehouse-list']);
  });

  it('should handle update error', () => {
    component.form.setValue({ id: 1, name: 'W1', location: 'Loc1' });
    warehouseServiceSpy.updateWarehouse.and.returnValue(throwError(() => new Error('fail')));
    component.onSubmit();
    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });
});
