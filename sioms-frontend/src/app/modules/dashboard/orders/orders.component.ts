import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { OrderService } from '../../../core/services/order.service';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  searchId: string = '';
  statuses: string[] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  constructor(private adminService: AdminService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.adminService.getOrders().subscribe(data => {
      this.orders = data.map(o => ({ ...o, newStatus: o.status }));
      this.filteredOrders = [...this.orders];
    });
  }

  filterOrders() {
    const id = this.searchId.trim().toLowerCase();
    this.filteredOrders = id
      ? this.orders.filter(o => o.orderId.toLowerCase().includes(id))
      : [...this.orders];
  }

  updateOrderStatus(order: any) {
    if (order.newStatus && order.newStatus !== order.status) {
      this.orderService.updateOrderStatus(order.orderId, order.newStatus).subscribe(() => {
        order.status = order.newStatus;
      });
    }
  }
}
