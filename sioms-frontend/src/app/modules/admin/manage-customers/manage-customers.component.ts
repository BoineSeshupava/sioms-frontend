import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-manage-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-customers.component.html',
  styleUrl: './manage-customers.component.scss'
})
export class ManageCustomersComponent implements OnInit {
  customers: Customer[] = [];
  errorMsg = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: () => this.errorMsg = 'Failed to load customers.'
    });
  }
}
