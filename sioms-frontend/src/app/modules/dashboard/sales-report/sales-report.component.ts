import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../core/services/report.service';
import { SalesReport } from '../../../core/models/SalesReport.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    if (format === 'excel') {
      this.exportToExcel();
    } else {
      this.exportToPDF();
    }
    this.exporting = false;
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(
      this.sales.map(s => ({
        'Order #': s.orderId,
        'Customer': s.customerName,
        'Total': s.totalAmount,
        'Date': s.orderDate,
        'Status': s.status
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesReport');
    XLSX.writeFile(workbook, 'sales-report.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Sales Report', 14, 16);
    (doc as any).autoTable({
      startY: 22,
      head: [['Order #', 'Customer', 'Total', 'Date', 'Status']],
      body: this.sales.map(s => [
        s.orderId,
        s.customerName,
        s.totalAmount,
        new Date(s.orderDate).toLocaleDateString(),
        s.status
      ]),
      theme: 'grid',
      styles: { fontSize: 10 }
    });
    doc.save('sales-report.pdf');
  }
}
