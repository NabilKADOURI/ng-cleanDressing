import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiListResponse } from '../models/api';
import { environment } from '../environments/environment.development';
import { CategoryInterface } from '../models/category';
import { ProductInterface } from '../models/product';
import { SolutionInterface } from '../models/solution';
import { MatterInterface } from '../models/matter';
import { ArticleInterface } from '../models/article';
import { IUserInterface, UserInterface } from '../models/IUser';
import { TestimonialInterface } from '../models/testimonial';

@Injectable({
  providedIn: 'root',
})
export class EntityService {

  private url = `${environment.apiBaseUrl}/api`;

  constructor(private http: HttpClient) { }

  getSolution():Observable<ApiListResponse<SolutionInterface>>{
    return this.http.get<ApiListResponse<SolutionInterface>>(`${this.url}/services`)
  }

  getArticle():Observable<ApiListResponse<ArticleInterface>>{
    return this.http.get<ApiListResponse<ArticleInterface>>(`${this.url}/articles`)
  }
 
  getCategory():Observable<ApiListResponse<CategoryInterface>>{
    return this.http.get<ApiListResponse<CategoryInterface>>(`${this.url}/categories`)
  }

  getProduct():Observable<ApiListResponse<ProductInterface>>{
    return this.http.get<ApiListResponse<ProductInterface>>(`${this.url}/products`)
  }

  // Méthode pour récupérer les catégories avec leurs produits
  getCategoriesWithProducts():Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(`${this.url}/categories?include=products`);
  }

  getMatter():Observable<ApiListResponse<MatterInterface>>{
    return this.http.get<ApiListResponse<MatterInterface>>(`${this.url}/matters`)
  }

  getTestimonial():Observable<ApiListResponse<TestimonialInterface>>{
    return this.http.get<ApiListResponse<TestimonialInterface>>(`${this.url}/testimonials`)
  }

  
  getArticleById(id: string): Observable<ArticleInterface> {
    return this.http.get<ArticleInterface>(`${this.url}/articles/${id}`);
  }

  getUserById(id: number | string): Observable<UserInterface>{

    return this.http.get<UserInterface>(`${this.url}/users/${id}`)
  }

  setUser(user: IUserInterface): Observable<any> {
    return this.http.post(`${this.url}/users`, user);
  }

  uploadProfilePicture(userId: number, formData: FormData):Observable<any> {
    return this.http.post(`${this.url}/users/${userId}/upload-picture`, formData);
  }
}


