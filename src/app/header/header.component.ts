import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Correction de 'styleUrl' à 'styleUrls'
})
export class HeaderComponent {

  // Injection d'AuthService pour la gestion de l'authentification
  authService = inject(AuthService);

  // Injection de Router pour gérer les redirections
  router = inject(Router);

  constructor(private elementRef: ElementRef) { }

  // Écouteur d'événement pour détecter le défilement de la fenêtre
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Récupère la hauteur du logo
    const logoHeight = this.elementRef.nativeElement.querySelector('.logo-container').offsetHeight;
    // Récupère l'élément de la barre de navigation
    const navbar = this.elementRef.nativeElement.querySelector('#mainNavbar');

    // Ajoute ou supprime une classe pour fixer la barre de navigation en haut de la page
    if (window.pageYOffset > logoHeight) {
      navbar.classList.add('fixed-navbar');
    } else {
      navbar.classList.remove('fixed-navbar');
    }
  }

  // Méthode pour gérer la déconnexion de l'utilisateur
  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirige vers la page d'accueil après déconnexion
  }

  // Méthode pour rediriger vers la page de connexion avec gestion de l'URL de redirection
  navigateToLogin() {
    this.authService.setRedirectUrl('/'); // Définit l'URL de redirection après connexion
    this.router.navigate(['/connexion']); // Redirige vers la page de connexion
  }

  // Méthode pour rediriger vers la page d'inscription avec gestion de l'URL de redirection
  navigateToRegister() {
    this.authService.setRedirectUrl('/'); // Définit l'URL de redirection après inscription
    this.router.navigate(['/connexion']); // Redirige vers la page d'inscription
  }
}
