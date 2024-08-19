import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ICredentials, IToken, TokenDecoded } from "../models/auth";
import { Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(credentials: ICredentials): Observable<IToken> {
    return this.http.post<IToken>(`${this.apiUrl}/api/login_check`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  
  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string  {
    return localStorage.getItem('token') || "";
  }

  getDecodedToken(): TokenDecoded {
    return jwtDecode(this.getToken());
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
