import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../core/models/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
  
    const loginData: LoginRequest = this.loginForm.value;
  
    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
  
        const decodedToken = JSON.parse(atob(res.token.split('.')[1]));
        const role = decodedToken.role;
        this.authService.setUserRole(role);
  
        // Route based on role
        if (role === 'Admin') {
          this.router.navigate(['/dashboard/admin-home']);
        } else {
          this.router.navigate(['/dashboard/customer-home']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid login credentials';
      }
    });
  }
}
