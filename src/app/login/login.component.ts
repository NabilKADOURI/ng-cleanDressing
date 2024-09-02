// Importation des modules nécessaires d'Angular
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service'; // Service d'authentification personnalisé
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login', // Sélecteur du composant
  standalone: true, // Indique que le composant est autonome
  imports: [ReactiveFormsModule, CommonModule, RouterLink], // Modules utilisés dans le composant
  templateUrl: './login.component.html', // Chemin vers le template HTML
  styleUrl: './login.component.css' // Chemin vers la feuille de style CSS
})
export class LoginComponent implements OnInit {

  // Déclaration du formulaire de connexion
  loginForm: FormGroup = new FormGroup({}); 

  // Injection des services nécessaires
  constructor(private authService: AuthService, private router: Router) {}

  // Initialisation du composant
  ngOnInit() {
    // Configuration du formulaire avec des validations
    this.loginForm = new FormGroup({
      credentials: new FormGroup({
        username: new FormControl('', [Validators.minLength(2)]), // Champ de nom d'utilisateur avec validation de longueur minimale
        password: new FormControl('', [Validators.required, Validators.minLength(2)]), // Champ de mot de passe requis avec validation de longueur minimale
      }),
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    // Vérifie si le formulaire est valide avant de continuer
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value.credentials; // Extraction des valeurs du formulaire
      this.authService.login({ username, password }).subscribe(
        (token) => {
          // En cas de succès de la connexion, sauvegarde le token et redirige l'utilisateur
          console.log('Token received:', token); 
          this.authService.saveToken(token.token); // Sauvegarde du token reçu
          this.router.navigate(['/category']); // Redirection vers la page des catégories
        },
        error => {
          // En cas d'échec de la connexion, affiche une erreur
          console.error('Login failed', error);
        }
      );
    }
  }



}
