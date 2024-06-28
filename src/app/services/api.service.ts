import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryInterface } from '../models/category';
import { ProductInterface } from '../models/product';
import { SolutionInterface } from '../models/solution';
// import { ProductInterface } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // fetchAll(): Observable<CategoryInterface[]> {
  //   return this.http.get<CategoryInterface[]>(this.apiUrl);
  // }
  getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(`${this.apiUrl}/categories`);
  }

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.apiUrl}/products`);
  }
  getSolutions(): Observable<SolutionInterface[]> {
    return this.http.get<SolutionInterface[]>(`${this.apiUrl}/services`);
  }
 

  
}

