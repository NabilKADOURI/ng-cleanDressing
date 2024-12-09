import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { EntityService } from '../shared/services/entity.service';
import { UserInterface } from '../shared/models/IUser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  userService = inject(EntityService);
  userId: number | null = null; // Initialisation de userId à null
  user: UserInterface | undefined;
  urlImage = environment.urlPicture;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const token = this.authService.getToken(); // Récupération du token JWT
    if (token) {
      const decodedToken = this.authService.getDecodedToken();
      if (decodedToken && decodedToken.user_id) {
        this.userId = decodedToken.user_id;
        this.loadUserData(); // Appel à loadUserData si le token est valide
      } else {
        console.error('Invalid or missing user_id in token');
      }
    } else {
      console.error('No token found');
    }
  }

  loadUserData(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((data) => {
        this.user = data;
     
      });
    }
  }

  // Écouteur d'événement pour détecter le défilement de la fenêtre
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Récupère la hauteur du logo
    const logoHeight =
      this.elementRef.nativeElement.querySelector(
        '.logo-container'
      ).offsetHeight;
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
    this.router.navigate(['/']);
  }

  // Méthode pour rediriger vers la page de connexion avec gestion de l'URL de redirection
  navigateToLogin() {
    this.authService.setRedirectUrl('/');
    this.router.navigate(['/connexion']);
  }

  // Méthode pour rediriger vers la page d'inscription avec gestion de l'URL de redirection
  navigateToRegister() {
    this.authService.setRedirectUrl('/');
    this.router.navigate(['/connexion']);
  }
}
