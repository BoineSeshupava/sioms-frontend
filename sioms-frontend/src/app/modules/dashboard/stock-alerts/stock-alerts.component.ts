import { Component, OnInit } from '@angular/core';
import { StockAlertService } from '../../../core/services/stock-alert.service';
import { StockAlert } from '../../../core/models/StockAlert.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-alerts',
  templateUrl: './stock-alerts.component.html',
  styleUrls: ['./stock-alerts.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class StockAlertsComponent implements OnInit {
  alerts: StockAlert[] = [];
  loading = false;
  error: string | null = null;

  constructor(private stockAlertService: StockAlertService) {}

  ngOnInit(): void {
    this.fetchAlerts();
  }

  fetchAlerts() {
    this.loading = true;
    this.error = null;
    this.stockAlertService.getStockAlerts().subscribe({
      next: (data) => {
        this.alerts = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load stock alerts.';
        this.loading = false;
      }
    });
  }
}
