import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/models/cart-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.scss'
})
export class MyCartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }
  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity < 1) return;

    this.cartService.updateCartItem(item.cartItemId, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity;
      },
      error: err => {
        console.error('Failed to update cart item', err);
      }
    });
  }


  removeItem(productId: string) {
    this.cartService.removeFromCartByProductId(productId).subscribe(() => {
      this.loadCart();
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.loadCart();
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
}
