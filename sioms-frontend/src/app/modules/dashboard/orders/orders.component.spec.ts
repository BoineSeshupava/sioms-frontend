import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('OrdersComponent', () => {
  let fixture: ComponentFixture<OrdersComponent>;
  let component: OrdersComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersComponent, FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter orders by id', () => {
    component.orders = [
      { orderId: 'A1', status: 'Pending', orderDate: '2025-08-21', totalAmount: 100, newStatus: 'Pending' },
      { orderId: 'B2', status: 'Delivered', orderDate: '2025-08-22', totalAmount: 200, newStatus: 'Delivered' }
    ];
    component.searchId = 'A1';
    component.filterOrders();
    expect(component.filteredOrders.length).toBe(1);
    expect(component.filteredOrders[0].orderId).toBe('A1');
  });
  it('should update order status', () => {
    const order = { orderId: 'A1', status: 'Pending', newStatus: 'Delivered' };
    spyOn(component['orderService'], 'updateOrderStatus').and.returnValue(of(undefined));
    component.updateOrderStatus(order);
    expect(order.status).toBe('Delivered');
  });
});
