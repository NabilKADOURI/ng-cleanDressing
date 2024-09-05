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

@Injectable({
  providedIn: 'root',
})
export class EntityService {

  private url = `${environment.apiBaseUrl}/api`;

  constructor(private http: HttpClient) { }

  getService():Observable<ApiListResponse<SolutionInterface>>{
    return this.http.get<ApiListResponse<SolutionInterface>>(`${this.url}/services`)
  }

  getCategory():Observable<ApiListResponse<CategoryInterface>>{
    return this.http.get<ApiListResponse<CategoryInterface>>(`${this.url}/categories`)
  }

  getProduct():Observable<ApiListResponse<ProductInterface>>{
    return this.http.get<ApiListResponse<ProductInterface>>(`${this.url}/products`)
  }

  getMatter():Observable<ApiListResponse<MatterInterface>>{
    return this.http.get<ApiListResponse<MatterInterface>>(`${this.url}/matters`)
  }

  getArticle():Observable<ApiListResponse<ArticleInterface>>{
    return this.http.get<ApiListResponse<ArticleInterface>>(`${this.url}/articles`)
  }

  getArticleById(id: string): Observable<ArticleInterface> {
    return this.http.get<ArticleInterface>(`${this.url}/${id}`);
  }

  getUserById(id: number): Observable<UserInterface>{

    return this.http.get<UserInterface>(`${this.url}/users/${id}`)
  }

  setUser(user: IUserInterface): Observable<any> {
    return this.http.post(`${this.url}/users`, user);
  }
}

























  // Constructeur du service
//   constructor(
//     protected http: HttpClient, // Client HTTP pour faire des requêtes
//     @Inject('baseUri') protected entityBaseUri: string // URI de base pour les requêtes
//   ) {}

//   // Méthode pour récupérer toutes les entités
//   fetchAll(): Observable<ApiListResponse<T>> {
//     return this.http.get<ApiListResponse<T>>(
//       `${environment.apiBaseUrl}${this.entityBaseUri}` // Construit l'URL pour l'appel API
//     );
//   }

//   // Méthode pour récupérer une entité par son ID
//   fetch(id: string | null): Observable<T> {
//     return this.http.get<T>(
//       `${environment.apiBaseUrl}${this.entityBaseUri}/${id}` // Construit l'URL pour l'appel API
//     );
//   }
// }

// // Token d'injection pour le service de catégories
// export const CategoryServiceToken = new InjectionToken<
//   EntityService<CategoryInterface>
// >('Category service', {
//   providedIn: 'root', // Service disponible pour toute l'application
//   factory: () => {
//     const http = inject(HttpClient); // Injecte le client HTTP
//     return new EntityService(http, '/api/categories'); // Crée une instance de EntityService pour les catégories
//   },
// });

// // // Token d'injection pour le service de produits
// export const ProductServiceToken = new InjectionToken<
//   EntityService<ProductInterface>
// >('Product service', {
//   providedIn: 'root', // Service disponible pour toute l'application
//   factory: () => {
//     const http = inject(HttpClient); // Injecte le client HTTP
//     return new EntityService(http, '/api/products'); // Crée une instance de EntityService pour les produits
//   },
// });

// // Token d'injection pour le service de solutions
// export const SolutionServiceToken = new InjectionToken<
//   EntityService<SolutionInterface>
// >('Solution service', {
//   providedIn: 'root', // Service disponible pour toute l'application
//   factory: () => {
//     const http = inject(HttpClient); // Injecte le client HTTP
//     return new EntityService(http, '/api/services'); // Crée une instance de EntityService pour les solutions
//   },
// });

// // Token d'injection pour le service de matières
// export const MatterServiceToken = new InjectionToken<
//   EntityService<MatterInterface>
// >('Matter service', {
//   providedIn: 'root', // Service disponible pour toute l'application
//   factory: () => {
//     const http = inject(HttpClient); // Injecte le client HTTP
//     return new EntityService(http, '/api/matters'); // Crée une instance de EntityService pour les matières
//   },
// });
