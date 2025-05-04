import { OrderItem } from './order-item.model';

export interface Order {
  id: string;
  customerId: string;
  orderDate: Date;
  status: string;
  totalAmount: number;
  items: OrderItem[];
}
