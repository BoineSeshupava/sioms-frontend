import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVendorComponent } from './add-vendor.component';
import { VendorService } from '../../../core/services/vendor.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('AddVendorComponent', () => {
  let component: AddVendorComponent;
  let fixture: ComponentFixture<AddVendorComponent>;
  let vendorServiceSpy: jasmine.SpyObj<VendorService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    vendorServiceSpy = jasmine.createSpyObj('VendorService', ['addVendor']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AddVendorComponent, ReactiveFormsModule],
      providers: [
        { provide: VendorService, useValue: vendorServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with controls', () => {
    expect(component.form.contains('name')).toBeTrue();
    expect(component.form.contains('contactEmail')).toBeTrue();
  });

  it('should call addVendor on submit', () => {
    component.form.setValue({ name: 'V1', contactEmail: 'v1@mail.com', phone: '', address: '' });
    vendorServiceSpy.addVendor.and.returnValue(of({ id: 1, name: 'V1', contactEmail: 'v1@mail.com' }));
    component.onSubmit();
    expect(vendorServiceSpy.addVendor).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['admin/vendor-list']);
  });

  it('should handle addVendor error', () => {
    component.form.setValue({ name: 'V1', contactEmail: 'v1@mail.com', phone: '', address: '' });
    vendorServiceSpy.addVendor.and.returnValue(throwError(() => new Error('fail')));
    component.onSubmit();
    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });
});
