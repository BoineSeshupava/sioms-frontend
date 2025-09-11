import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../core/services/report.service';
import { SalesReport } from '../../../core/models/SalesReport.model';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss'],
  standalone: true,
  imports: [CurrencyPipe, CommonModule]
})
export class SalesReportComponent implements OnInit {
  sales: SalesReport[] = [];
  loading = false;
  error: string | null = null;
  exporting = false;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.fetchSales();
  }

  fetchSales() {
    this.loading = true;
    this.error = null;
    this.reportService.getSalesReport().subscribe({
      next: (data) => {
        this.sales = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load sales report.';
        this.loading = false;
      }
    });
  }

  export(format: 'excel' | 'pdf') {
    this.exporting = true;
    this.reportService.exportSalesReport(format).subscribe({
      next: (blob) => {
        const fileName = `sales-report.${format === 'excel' ? 'xlsx' : 'pdf'}`;
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        this.exporting = false;
      },
      error: () => {
        this.error = 'Export failed.';
        this.exporting = false;
      }
    });
  }
}
