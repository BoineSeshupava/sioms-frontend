import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.getCustomers().subscribe(data => this.customers = data);
  }
}
