import {inject, Injectable } from '@angular/core';
import { OrderInterface } from '../models/order';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = environment.apiBaseUrl;
  token = inject(AuthService).getToken();

  headers : HttpHeaders = new HttpHeaders({
  Authorization: `Bearer ${this.token}`
 })

  constructor(private http: HttpClient) {}

  createOrder(orderData: OrderInterface): Observable<any> {
    return this.http.post(`${this.url}/api/orders`, orderData,{headers:this.headers});
  }

  getOrderByUri(order: string): Observable<OrderInterface> {
    return this.http.get<OrderInterface>(this.url + order);
  }
}
