import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { AdminService } from '../../../core/services/admin.service';
import { Router } from '@angular/router';
import { StockAlertsComponent } from "../stock-alerts/stock-alerts.component";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, NgChartsModule, StockAlertsComponent],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  stats: any[] = [];
  ordersChartData: any;
  categoryChartData: any;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.adminService.getDashboardStats().subscribe(data => {
      this.stats = data.stats || [];
      this.ordersChartData = data.ordersChartData;
      this.categoryChartData = data.categoryChartData;
    });
  }

  goToProducts() {
    this.router.navigate(['/dashboard/products']);
  }

  goToCustomers() {
    this.router.navigate(['/dashboard/customers']);
  }

  goToOrders() {
    this.router.navigate(['/dashboard/orders']);
  }
}