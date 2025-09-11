import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarehouseService } from '../../../core/services/warehouse.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddWarehouseComponent {
  form: ReturnType<FormBuilder['group']>;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      location: ['', [Validators.required, Validators.maxLength(150)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    this.warehouseService.addWarehouse(this.form.value).subscribe({
      next: () => this.router.navigate(['admin/warehouse-list']),
      error: () => {
        this.error = 'Failed to add warehouse.';
        this.loading = false;
      }
    });
  }
}
