import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, NgChartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  ngOnInit(): void {
  }
  stats = [
    { title: 'Total Products', value: 120 },
    { title: 'Total Orders', value: 320 },
    { title: 'Customers', value: 85 },
    { title: 'Vendors', value: 15 }
  ];

  ordersChartLabels = ['January', 'February', 'March', 'April'];
  ordersChartData = {
    labels: this.ordersChartLabels,
    datasets: [
      {
        label: 'Orders',
        data: [30, 50, 80, 45],
        backgroundColor: '#007bff'
      }
    ]
  };

  categoryChartLabels = ['Electronics', 'Clothing', 'Home', 'Books'];
  categoryChartData = {
    labels: this.categoryChartLabels,
    datasets: [
      {
        data: [40, 20, 25, 15],
        backgroundColor: ['#17a2b8', '#28a745', '#ffc107', '#dc3545']
      }
    ]
  };
}
