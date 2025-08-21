import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  product: Product = {
    productId: '',
    productName: '',
    description: '',
    price: 0,
    imageUrl: '',
    categoryId: '',
    stockQuantity: 0
  };
  successMsg = '';
  errorMsg = '';

  constructor(private adminService: AdminService) {}

  addProduct() {
    this.adminService.addProduct(this.product).subscribe({
      next: (res) => {
        this.successMsg = 'Product added successfully!';
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = 'Failed to add product.';
        this.successMsg = '';
      }
    });
  }
}
