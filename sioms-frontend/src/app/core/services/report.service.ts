import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesReport } from '../models/SalesReport.model';
import { InventoryReport } from '../models/InventoryReport.model';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = `${environment.apiBaseUrl}/reports`;

  constructor(private http: HttpClient) {}

  getSalesReport(): Observable<SalesReport[]> {
    return this.http.get<SalesReport[]>(`${this.apiUrl}/sales`);
  }

  getInventoryReport(): Observable<InventoryReport[]> {
    return this.http.get<InventoryReport[]>(`${this.apiUrl}/inventory`);
  }
}
