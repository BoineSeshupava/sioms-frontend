import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Vendor } from '../../../core/models/Vendor.model';
import { VendorService } from '../../../core/services/vendor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private vendorService: VendorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchVendors();
  }

  fetchVendors() {
    this.loading = true;
    this.error = null;
    this.vendorService.getVendors().subscribe({
      next: (data) => {
        this.vendors = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load vendors.';
        this.loading = false;
      }
    });
  }

  onAdd() {
    this.router.navigate(['admin/add-vendor']);
  }

  onEdit(id: number) {
    this.router.navigate(['admin/edit-vendor', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this vendor?')) {
      this.vendorService.deleteVendor(id).subscribe({
        next: () => this.fetchVendors(),
        error: () => (this.error = 'Delete failed.')
      });
    }
  }
}
