import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../core/services/report.service';
import { InventoryReport } from '../../../core/models/InventoryReport.model';
import { CommonModule } from '@angular/common';
// Add export libraries
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    if (format === 'excel') {
      this.exportToExcel();
    } else {
      this.exportToPDF();
    }
    this.exporting = false;
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(
      this.inventory.map(i => ({
        'Product': i.productName,
        'Warehouse': i.warehouseName,
        'Stock': i.stock,
        'Threshold': i.threshold
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'InventoryReport');
    XLSX.writeFile(workbook, 'inventory-report.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Inventory Report', 14, 16);
    (doc as any).autoTable({
      startY: 22,
      head: [['Product', 'Warehouse', 'Stock', 'Threshold']],
      body: this.inventory.map(i => [
        i.productName,
        i.warehouseName,
        i.stock,
        i.threshold
      ]),
      theme: 'grid',
      styles: { fontSize: 10 }
    });
    doc.save('inventory-report.pdf');
  }
}
