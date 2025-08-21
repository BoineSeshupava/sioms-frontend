import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent {
  public userName: string = 'Customer';
  constructor(private router: Router, private authService: AuthService) {
    this.userName = this.authService.getUserName() ?? 'Customer';
  }

  goToOrders() {
    this.router.navigate(['/dashboard/my-orders']);
  }

  goToCart() {
    this.router.navigate(['/dashboard/cart']);
  }

  goToProducts() {
    this.router.navigate(['/dashboard/products']);
  }
}
