import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ArticleInterface } from "../models/article";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  fetchAllArticles(): Observable<ArticleInterface[]> {
    return this.http.get<ArticleInterface[]>(`${this.apiUrl}/articles`);
  }
 

  fetchById(id: any): Observable<ArticleInterface> {
    return this.http.get<ArticleInterface>(`${this.apiUrl}/articles/${id}`);
  }
}
