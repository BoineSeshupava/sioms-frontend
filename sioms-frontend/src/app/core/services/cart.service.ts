import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly API_URL = 'https://localhost:5001/api/Cart'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.API_URL}`);
  }

  addToCart(cartItem: { productId: string; productName: string; price:number ; quantity: number }) {
    return this.http.post(`${this.API_URL}/add`, cartItem);
  }

  updateCartItem(cartItemId: string, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${cartItemId}`, quantity);
  }

  removeItem(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/remove/${id}`);
  }

  removeFromCartByProductId(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/by-product/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.API_URL}/clear`);
  }
  
}
