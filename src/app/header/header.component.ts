import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header', 
  standalone: true, 
  imports: [RouterLink, CommonModule], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css' 
})
export class HeaderComponent {

  // Injection d'un service AuthService pour la gestion de l'authentification
  service = inject(AuthService);

  // Le constructeur reçoit un ElementRef pour manipuler les éléments DOM
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

  // Méthode pour déconnecter l'utilisateur
  logout() {
    this.service.logout();
  }
}
