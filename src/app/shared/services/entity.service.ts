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
  constructor(
    protected http: HttpClient,
    @Inject('baseUri') protected entityBaseUri: string
  ) {}

  fetchAll(): Observable<ApiListResponse<T>> {
    return this.http.get<ApiListResponse<T>>(
      `${environment.apiBaseUrl}${this.entityBaseUri}
    `
    );
  }

  fetch(id: string | null): Observable<T> {
    return this.http.get<T>(
      `${environment.apiBaseUrl}${this.entityBaseUri}/${id}`
    );
  }
}

export const CategoryServiceToken = new InjectionToken<
  EntityService<CategoryInterface>
>('Category service', {
  providedIn: 'root',
  factory: () => {
    const http = inject(HttpClient);
    return new EntityService(http, '/api/categories');
  },
});

export const ProductServiceToken = new InjectionToken<
  EntityService<ProductInterface>
>('Product service', {
  providedIn: 'root',
  factory: () => {
    const http = inject(HttpClient);
    return new EntityService(http, '/api/products');
  },
});

export const SolutionServiceToken = new InjectionToken<
  EntityService<SolutionInterface>
>('Solution service', {
  providedIn: 'root',
  factory: () => {
    const http = inject(HttpClient);
    return new EntityService(http, '/api/services');
  },
});

export const MatterServiceToken = new InjectionToken<
  EntityService<MatterInterface>
>('Matter service', {
  providedIn: 'root',
  factory: () => {
    const http = inject(HttpClient);
    return new EntityService(http, '/api/matters');
  },
});
