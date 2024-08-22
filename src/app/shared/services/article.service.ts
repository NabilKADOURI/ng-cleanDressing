import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { ArticleInterface } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleUrl = `${environment.apiBaseUrl}/api/articles`;

  constructor(private http: HttpClient) { }

  getArticleById(id: number): Observable<ArticleInterface> {
    return this.http.get<ArticleInterface>(`${this.articleUrl}/${id}`);
  }
}
