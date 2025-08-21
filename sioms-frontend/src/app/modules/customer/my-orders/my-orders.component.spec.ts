import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyOrdersComponent } from './my-orders.component';

describe('MyOrdersComponent', () => {
  let fixture: ComponentFixture<MyOrdersComponent>;
  let component: MyOrdersComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOrdersComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render orders table', () => {
    component.orders = [
      { orderId: '123', status: 'Pending', orderDate: '2025-08-21', totalAmount: 100, orderItems: [] }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('123');
    expect(compiled.textContent).toContain('Pending');
  });

  it('should show error message', () => {
    component.errorMsg = 'Failed to load orders.';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Failed to load orders.');
  });
});
