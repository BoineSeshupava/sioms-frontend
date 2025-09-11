export interface InventoryReport {
  productId: number;
  productName: string;
  warehouseName: string;
  stock: number;
  threshold: number;
}