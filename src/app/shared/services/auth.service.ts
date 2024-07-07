import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ICredentials, IToken } from "../models/auth";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: ICredentials): Observable<IToken> {
    return this.http.post<IToken>(`${this.apiUrl}/login_check`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  
  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
