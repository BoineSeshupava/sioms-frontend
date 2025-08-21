import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../core/models/login-request.model';
import { LoginResponse } from '../../core/models/login-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/Auth`;

  constructor(private http: HttpClient) {}


  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    let response = this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      loginRequest
    );
    return response;
  }

  register(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userDetails);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUserName(): string | null {
    return localStorage.getItem('userName');
  } 
  setUserRole(role: string) {
    localStorage.setItem('userRole', role);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
