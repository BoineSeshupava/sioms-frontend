import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendorService } from '../../../core/services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditVendorComponent implements OnInit {
  form!: ReturnType<FormBuilder['group']>;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.form = this.fb.group({
        id: [null as number | null],
        name: ['', [Validators.required, Validators.maxLength(100)]],
        contactEmail: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(100)],
        ],
        phone: ['', [Validators.maxLength(20)]],
        address: ['', [Validators.maxLength(200)]],
      });
    }
  }
  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    const { id, ...rest } = this.form.value;
    this.vendorService.updateVendor(id, rest).subscribe({
      next: () => this.router.navigate(['admin/vendor-list']),
      error: () => {
        this.error = 'Failed to update vendor.';
        this.loading = false;
      },
    });
  }
}
