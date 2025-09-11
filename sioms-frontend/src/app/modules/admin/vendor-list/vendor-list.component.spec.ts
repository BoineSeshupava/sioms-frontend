import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendorListComponent } from './vendor-list.component';
import { VendorService } from '../../../core/services/vendor.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('VendorListComponent', () => {
  let component: VendorListComponent;
  let fixture: ComponentFixture<VendorListComponent>;
  let vendorServiceSpy: jasmine.SpyObj<VendorService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    vendorServiceSpy = jasmine.createSpyObj('VendorService', ['getVendors', 'deleteVendor']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [VendorListComponent],
      providers: [
        { provide: VendorService, useValue: vendorServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch vendors on init', () => {
    vendorServiceSpy.getVendors.and.returnValue(of([{ id: 1, name: 'V1', contactEmail: 'v1@mail.com' }]));
    fixture.detectChanges();
    expect(component.vendors.length).toBe(1);
    expect(component.loading).toBeFalse();
  });

  it('should handle fetch error', () => {
    vendorServiceSpy.getVendors.and.returnValue(throwError(() => new Error('fail')));
    fixture.detectChanges();
    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });

  it('should navigate to add-vendor', () => {
    component.onAdd();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['admin/add-vendor']);
  });

  it('should navigate to edit-vendor', () => {
    component.onEdit(2);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['admin/edit-vendor', 2]);
  });

  it('should delete vendor and refresh', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    vendorServiceSpy.deleteVendor.and.returnValue(of(void 0));
    component.fetchVendors = jasmine.createSpy();
    component.onDelete(1);
    expect(vendorServiceSpy.deleteVendor).toHaveBeenCalledWith(1);
  });
});
