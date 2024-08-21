import { Injectable } from '@angular/core';
import { ItemInterface, OrderInterface } from '../models/order';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createOrder(orderData: OrderInterface): Observable<any> {
    return this.http.post(`${this.url}/api/orders`, orderData).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error('Error occurred:', error);
            return throwError(() => new Error('Failed to create order'));
        })
    );
}


  getOrderByUri(order: string): Observable<OrderInterface>{

    return this.http.get<OrderInterface>(this.url + order)
  }
}
