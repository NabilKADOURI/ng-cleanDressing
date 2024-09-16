import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ICredentials, IToken, TokenDecoded } from "../models/auth";
import { Observable, tap } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiBaseUrl;
  private redirectUrl: string = '/'; // URL de redirection par défaut après connexion

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: ICredentials): Observable<IToken> {
    return this.http.post<IToken>(`${this.apiUrl}/api/login_check`, credentials).pipe(
      tap((tokenResponse: IToken) => {
        // Sauvegarder le token après une connexion réussie
        this.saveToken(tokenResponse.token);

        // Rediriger l'utilisateur vers l'URL souhaitée après la connexion
        this.router.navigate([this.redirectUrl]);
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string {
    return localStorage.getItem('token') || "";
  }

  getDecodedToken(): TokenDecoded {
      return jwtDecode(this.getToken());
  }
  

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']); // Redirection vers l'accueil après déconnexion
  }

  // Méthode pour définir l'URL de redirection après la connexion
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  // Méthode pour obtenir l'URL de redirection
  getRedirectUrl(): string {
    return this.redirectUrl;
  }
}
