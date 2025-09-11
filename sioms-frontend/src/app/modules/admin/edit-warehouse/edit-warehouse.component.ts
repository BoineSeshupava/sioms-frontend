import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WarehouseService } from '../../../core/services/warehouse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditWarehouseComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // initialize the form after FormBuilder is available
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      location: ['', [Validators.required, Validators.maxLength(150)]]
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.warehouseService.getWarehouse(id).subscribe({
        next: (warehouse) => {
          this.form.patchValue(warehouse);
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load warehouse.';
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;
    const { id, ...rest } = this.form.value;
    this.warehouseService.updateWarehouse(id, rest).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['admin/warehouse-list']);
      },
      error: () => {
        this.error = 'Failed to update warehouse.';
        this.loading = false;
      }
    });
  }
}
