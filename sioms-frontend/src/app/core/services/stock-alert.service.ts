import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockAlert } from '../models/StockAlert.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StockAlertService {
  private apiUrl = `${environment.apiBaseUrl}/stock-alerts`;

  constructor(private http: HttpClient) {}

  getStockAlerts(): Observable<StockAlert[]> {
    return this.http.get<StockAlert[]>(this.apiUrl);
  }
}
