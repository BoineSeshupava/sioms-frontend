import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';

  getCartItems(): CartItem[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  addToCart(item: CartItem): void {
    const items = this.getCartItems();
    const existing = items.find(i => i.product.id === item.product.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.push(item);
    }
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  removeItem(productId: string): void {
    const items = this.getCartItems().filter(i => i.product.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
