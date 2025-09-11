import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../../core/services/warehouse.service';
import { Warehouse } from '../../../core/models/Warehouse.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class WarehouseListComponent implements OnInit {
  warehouses: Warehouse[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private warehouseService: WarehouseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchWarehouses();
  }

  fetchWarehouses() {
    this.loading = true;
    this.error = null;
    this.warehouseService.getWarehouses().subscribe({
      next: (data) => {
        this.warehouses = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load warehouses.';
        this.loading = false;
      }
    });
  }

  onAdd() {
    this.router.navigate(['admin/add-warehouse']);
  }

  onEdit(id: number) {
    this.router.navigate(['admin/edit-warehouse', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this warehouse?')) {
      this.warehouseService.deleteWarehouse(id).subscribe({
        next: () => this.fetchWarehouses(),
        error: () => (this.error = 'Delete failed.')
      });
    }
  }
}