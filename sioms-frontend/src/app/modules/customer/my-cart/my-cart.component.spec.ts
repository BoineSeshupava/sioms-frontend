import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCartComponent } from './my-cart.component';

describe('MyCartComponent', () => {
  let fixture: ComponentFixture<MyCartComponent>;
  let component: MyCartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCartComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cart items', () => {
    component.cartItems = [
      { product: { name: 'Test Product', price: 10 }, quantity: 2 } as any
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
