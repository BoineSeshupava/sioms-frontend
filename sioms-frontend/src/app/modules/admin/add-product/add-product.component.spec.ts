import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddProductComponent', () => {
  let fixture: ComponentFixture<AddProductComponent>;
  let component: AddProductComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductComponent, ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a product form', () => {
    expect(component.addProduct).toBeDefined();
  });

  it('should call addProduct() on form submit', () => {
    spyOn(component, 'addProduct');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.addProduct).toHaveBeenCalled();
  });
});
