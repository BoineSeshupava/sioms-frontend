export interface StockAlert {
  productId: number;
  productName: string;
  warehouseName: string;
  currentStock: number;
  threshold: number;
}