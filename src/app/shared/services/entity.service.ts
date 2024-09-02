import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiListResponse } from '../models/api';
import { environment } from '../environments/environment.development';
import { CategoryInterface } from '../models/category';
import { ProductInterface } from '../models/product';
import { SolutionInterface } from '../models/solution';
import { MatterInterface } from '../models/matter';

@Injectable({
  providedIn: 'root',
})
export class EntityService<T> {
  // Constructeur du service
  constructor(
    protected http: HttpClient, // Client HTTP pour faire des requêtes
    @Inject('baseUri') protected entityBaseUri: string // URI de base pour les requêtes
  ) {}

  // Méthode pour récupérer toutes les entités
  fetchAll(): Observable<ApiListResponse<T>> {
    return this.http.get<ApiListResponse<T>>(
      `${environment.apiBaseUrl}${this.entityBaseUri}` // Construit l'URL pour l'appel API
    );
  }

  // Méthode pour récupérer une entité par son ID
  fetch(id: string | null): Observable<T> {
    return this.http.get<T>(
      `${environment.apiBaseUrl}${this.entityBaseUri}/${id}` // Construit l'URL pour l'appel API
    );
  }
}

// Token d'injection pour le service de catégories
export const CategoryServiceToken = new InjectionToken<
  EntityService<CategoryInterface>
>('Category service', {
  providedIn: 'root', // Service disponible pour toute l'application
  factory: () => {
    const http = inject(HttpClient); // Injecte le client HTTP
    return new EntityService(http, '/api/categories'); // Crée une instance de EntityService pour les catégories
  },
});

// Token d'injection pour le service de produits
export const ProductServiceToken = new InjectionToken<
  EntityService<ProductInterface>
>('Product service', {
  providedIn: 'root', // Service disponible pour toute l'application
  factory: () => {
    const http = inject(HttpClient); // Injecte le client HTTP
    return new EntityService(http, '/api/products'); // Crée une instance de EntityService pour les produits
  },
});

// Token d'injection pour le service de solutions
export const SolutionServiceToken = new InjectionToken<
  EntityService<SolutionInterface>
>('Solution service', {
  providedIn: 'root', // Service disponible pour toute l'application
  factory: () => {
    const http = inject(HttpClient); // Injecte le client HTTP
    return new EntityService(http, '/api/services'); // Crée une instance de EntityService pour les solutions
  },
});

// Token d'injection pour le service de matières
export const MatterServiceToken = new InjectionToken<
  EntityService<MatterInterface>
>('Matter service', {
  providedIn: 'root', // Service disponible pour toute l'application
  factory: () => {
    const http = inject(HttpClient); // Injecte le client HTTP
    return new EntityService(http, '/api/matters'); // Crée une instance de EntityService pour les matières
  },
});
