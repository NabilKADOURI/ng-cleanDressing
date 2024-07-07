import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CategoryInterface } from "../models/category";
import { ProductInterface } from "../models/product";
import { SolutionInterface } from "../models/solution";
import { MatterInterface } from "../models/matter";




@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // fetchAll(): Observable<CategoryInterface[]> {
  //   return this.http.get<CategoryInterface[]>(this.apiUrl);
  // }
 fetchAllCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(`${this.apiUrl}/categories`);
  }

 fetchAllProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.apiUrl}/products`);
  }

 fetchAllSolutions(): Observable<SolutionInterface[]> {
    return this.http.get<SolutionInterface[]>(`${this.apiUrl}/services`);
  }

 fetchAllMatter(): Observable<MatterInterface[]> {
    return this.http.get<MatterInterface[]>(`${this.apiUrl}/matters`);
  }
 

  
}

