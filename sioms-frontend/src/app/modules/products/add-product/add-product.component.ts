import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl(''),
    imageUrl: new FormControl('')
  });

  constructor(private productService: ProductService) {}

  submit() {
    if (this.productForm.valid) {
      // this.productService.addProduct(this.productForm.value).subscribe(() => {
      //   alert('Product added!');
      //   this.productForm.reset();
      // });
    }
  }
}
