import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/models/cart-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { Order, OrderItem } from '../../../core/models/order.model';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.scss'
})
export class MyCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  placingOrder = false;
  orderSuccess = '';
  orderError = '';

  constructor(private cartService: CartService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.cartItemId).subscribe(() => {
      this.loadCart();
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  placeOrder() {
    if (!this.cartItems.length) return;
    this.placingOrder = true;
    this.orderSuccess = '';
    this.orderError = '';

    const orderPayload: Omit<Order, 'orderId' | 'customerId' | 'totalAmount'> = {
      orderDate: new Date().toISOString(),
      status: 'Pending',
      orderItems: this.cartItems.map(item => ({
        productId: item.product.productId,
        quantity: item.quantity
      }))
    };

    this.orderService.placeOrder(orderPayload).subscribe({
      next: () => {
        this.orderSuccess = 'Order placed successfully!';
        this.cartItems = [];
      },
      error: () => {
        this.orderError = 'Failed to place order.';
      },
      complete: () => {
        this.placingOrder = false;
        this.loadCart();
      }
    });
  }
}
