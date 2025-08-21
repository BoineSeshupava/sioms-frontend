import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/order`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }
  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/myOrders`);
  }
  placeOrder(order: Omit<Order, 'orderId' | 'customerId' | 'totalAmount'>): Observable<Order> {
    // Only send orderDate, status, orderItems
    const payload = {
      orderDate: order.orderDate,
      status: order.status,
      orderItems: order.orderItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };
    return this.http.post<Order>(this.apiUrl, payload);
  }

  updateOrderStatus(id: string, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, status);
  }
}
