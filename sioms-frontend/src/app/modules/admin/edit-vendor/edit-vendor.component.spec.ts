import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditVendorComponent } from './edit-vendor.component';
import { VendorService } from '../../../core/services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('EditVendorComponent', () => {
  let component: EditVendorComponent;
  let fixture: ComponentFixture<EditVendorComponent>;
  let vendorServiceSpy: jasmine.SpyObj<VendorService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    vendorServiceSpy = jasmine.createSpyObj('VendorService', ['getVendor', 'updateVendor']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = {
      snapshot: { paramMap: { get: () => '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [EditVendorComponent, ReactiveFormsModule],
      providers: [
        { provide: VendorService, useValue: vendorServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVendorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vendor on init', () => {
    vendorServiceSpy.getVendor.and.returnValue(of({ id: 1, name: 'V1', contactEmail: 'v1@mail.com' }));
    component.ngOnInit();
    expect(component.form.value.name).toBe('V1');
    expect(component.loading).toBeFalse();
  });

  it('should handle load error', () => {
    vendorServiceSpy.getVendor.and.returnValue(throwError(() => new Error('fail')));
    component.ngOnInit();
    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });

  it('should call updateVendor on submit', () => {
    component.form.setValue({ id: 1, name: 'V1', contactEmail: 'v1@mail.com', phone: '', address: '' });
    vendorServiceSpy.updateVendor.and.returnValue(of(void 0));
    component.onSubmit();
    expect(vendorServiceSpy.updateVendor).toHaveBeenCalledWith(1, { id: 1, name: 'V1', contactEmail: 'v1@mail.com', phone: '', address: '' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['admin/vendor-list']);
  });

  it('should handle update error', () => {
    component.form.setValue({ id: 1, name: 'V1', contactEmail: 'v1@mail.com', phone: '', address: '' });
    vendorServiceSpy.updateVendor.and.returnValue(throwError(() => new Error('fail')));
    component.onSubmit();
    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });
});
