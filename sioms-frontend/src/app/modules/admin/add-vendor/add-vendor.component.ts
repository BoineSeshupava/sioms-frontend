import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendorService } from '../../../core/services/vendor.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddVendorComponent {
  form: ReturnType<FormBuilder['group']>;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      contactEmail: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.maxLength(20)]],
      address: ['', [Validators.maxLength(200)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    this.vendorService.addVendor(this.form.value).subscribe({
      next: () => this.router.navigate(['admin/vendor-list']),
      error: () => {
        this.error = 'Failed to add vendor.';
        this.loading = false;
      }
    });
  }
}
