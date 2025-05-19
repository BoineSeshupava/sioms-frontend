import { Product } from './product.model';

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
}
