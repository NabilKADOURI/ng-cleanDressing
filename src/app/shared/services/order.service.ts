import { Injectable } from '@angular/core';
import { ItemInterface, OrderInterface } from '../models/order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getItemByUri(itemUri: ItemInterface) {
    throw new Error('Method not implemented.');
  }

  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createOrder(orderData: OrderInterface): Observable<any> {
    return this.http.post(`${this.url}/api/orders`, orderData);
  }

  getOrderByUri(order: string): Observable<OrderInterface>{

    return this.http.get<OrderInterface>(this.url + order)
  }
}
