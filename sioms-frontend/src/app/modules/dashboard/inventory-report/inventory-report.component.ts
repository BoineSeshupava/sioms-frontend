import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../core/services/report.service';
import { InventoryReport } from '../../../core/models/InventoryReport.model';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-inventory-report',
  standalone: true,
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss'],
  imports: [CommonModule]
})
export class InventoryReportComponent implements OnInit {
  inventory: InventoryReport[] = [];
  loading = false;
  error: string | null = null;
  exporting = false;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.fetchInventory();
  }

  fetchInventory() {
    this.loading = true;
    this.error = null;
    this.reportService.getInventoryReport().subscribe({
      next: (data) => {
        this.inventory = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load inventory report.';
        this.loading = false;
      }
    });
  }

  export(format: 'excel' | 'pdf') {
    this.exporting = true;
    this.reportService.exportInventoryReport(format).subscribe({
      next: (blob) => {
        const fileName = `inventory-report.${format === 'excel' ? 'xlsx' : 'pdf'}`;
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
