// Importation des modules et services nécessaires
// import { Component, inject } from '@angular/core';
// import { UserService } from '../shared/services/user.service';
// import { AuthService } from '../shared/services/auth.service'; // Import du service d'authentification
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-register', // Sélecteur du composant d'inscription
//   standalone: true, // Le composant est autonome
//   imports: [RouterLink, CommonModule, ReactiveFormsModule], // Modules importés pour le composant
//   templateUrl: './register.component.html', // Chemin du template HTML
//   styleUrls: ['./register.component.css'] // Chemin du fichier de styles CSS
// })
// export class RegisterComponent {

//   // Injection du service utilisateur, du service d'authentification et du routeur
//   private userService = inject(UserService);
//   private authService = inject(AuthService); // Service d'authentification pour gérer la connexion
//   private router = inject(Router);

//   // Déclaration du formulaire d'inscription avec ses contrôles et validations
//   public loginForm: FormGroup = new FormGroup({
//     name: new FormControl('', Validators.required), // Champ de nom requis
//     firstName: new FormControl('', Validators.required), // Champ de prénom requis
//     phone: new FormControl('', [Validators.required, Validators.minLength(10)]), // Champ de téléphone requis avec validation de longueur minimale
//     adress: new FormControl(''), // Champ d'adresse (optionnel)
//     email: new FormControl('', [Validators.required, Validators.email]), // Champ d'email requis avec validation de format
//     password: new FormControl('', [Validators.required, Validators.minLength(6)]) // Champ de mot de passe requis avec validation de longueur minimale
//   });

//   // Méthode de soumission du formulaire d'inscription
//   onSubmit() {
//     if (this.loginForm.valid) {
//       // Appelle le service d'inscription avec les données du formulaire
//       this.userService.register(this.loginForm.value).subscribe({
//         next: (response) => {
//           // En cas de succès de l'inscription
//           console.log('Réponse de l\'inscription:', response);
//           alert('Inscription réussie ! Vous êtes maintenant connecté.');

//           // Connecter automatiquement l'utilisateur après l'inscription
//           const { email, password } = this.loginForm.value;
//           this.authService.login({ username: email, password }).subscribe({
//             next: (tokenResponse) => {
//               // Sauvegarde du token et redirection après la connexion réussie
//               this.authService.saveToken(tokenResponse.token);
//               this.router.navigate(['/category']); // Redirection vers la page des catégories
//             },
//             error: (loginError) => {
//               console.error('Erreur lors de la connexion:', loginError);
//               alert('Une erreur est survenue lors de la connexion automatique.');
//             }
//           });
//         },
//         error: (error) => {
//           // En cas d'erreur lors de l'inscription
//           console.error('Erreur lors de l\'inscription:', error);
//           alert('Une erreur est survenue lors de l\'inscription.');
//         }
//       });
//     } else {
//       // Affiche un message si le formulaire est invalide
//       alert('Le formulaire est invalide. Veuillez vérifier les champs.');
//     }
//   }
// }
