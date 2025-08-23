import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MyCartComponent } from './my-cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Product } from '../../../core/models/product.model';

describe('MyCartComponent', () => {
  let fixture: ComponentFixture<MyCartComponent>;
  let component: MyCartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCartComponent, HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(MyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart item product name', () => {
    component.cartItems = [
      {
        product: { productId: 'p1', productName: 'Test Product', price: 10 } as Product, quantity: 2,
        cartItemId: ''
      }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Product');
  });

  it('should call placeOrder()', () => {
    spyOn(component, 'placeOrder');
    const btn = fixture.nativeElement.querySelector('.btn-success');
    if (btn) {
      btn.click();
      expect(component.placeOrder).toHaveBeenCalled();
    }
  });
});
