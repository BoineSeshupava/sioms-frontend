import { OrderItem } from './order-item.model';

export interface Order {
  orderId?: string;
  // customerId and totalAmount are present in response, not sent in request
  customerId?: string;
  orderDate: string;
  status: string;
  totalAmount?: number;
  orderItems: OrderItem[];
}
export { OrderItem };

