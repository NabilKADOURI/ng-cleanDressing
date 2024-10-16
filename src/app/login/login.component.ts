import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { EntityService } from '../shared/services/entity.service';
import { forbiddenWordsArray } from '../shared/forbidden-words/forbidden-words';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Formulaire de connexion
  loginForm: FormGroup = new FormGroup({});
  // Formulaire d'inscription
  registerForm: FormGroup = new FormGroup({});
  // Messages pour l'utilisateur
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: EntityService
  ) {}

  ngOnInit() {
    // Initialisation du formulaire de connexion
    this.loginForm = new FormGroup({
      credentials: new FormGroup({
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
      }),
    });

    // Initialisation du formulaire d'inscription
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.forbiddenWordsValidator]),
      firstName: new FormControl('', [Validators.required, this.forbiddenWordsValidator]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      adress: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email,this.forbiddenWordsValidator]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
      ]),
    });
  }

  // Méthode pour soumettre le formulaire de connexion
  onLoginSubmit() {
    this.successMessage = ''; // Réinitialiser le message de succès
    this.errorMessage = ''; // Réinitialiser le message d'erreur

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value.credentials;
      this.authService.login({ username, password }).subscribe(
        (token) => {
          this.authService.saveToken(token.token);
          this.successMessage =
            'Connexion réussie ! Vous serez redirigé vers le panier.';
          setTimeout(() => this.router.navigate(['/panier']), 2000); // Redirection après 2 secondes
        },
        (error) => {
          const serverError =
            error.error?.message ||
            'Échec de la connexion. Veuillez vérifier vos informations.';
          this.errorMessage = serverError;
          console.error('Login failed', error);
        }
      );
    }
  }

  // Méthode pour soumettre le formulaire d'inscription
  onRegisterSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.registerForm.valid ) {
      this.userService.setUser(this.registerForm.value).subscribe({
        next: () => {
          const { email, password } = this.registerForm.value;
          this.authService.login({ username: email, password }).subscribe({
            next: () => {
              this.successMessage =
                'Inscription réussie ! Connexion en cours...';
              setTimeout(() => {
                this.router.navigate([this.authService.getRedirectUrl()]);
              }, 3000); // Redirection après 2 secondes
            },
            error: (loginError) => {
              this.errorMessage =
                'Erreur lors de la connexion après inscription.';
              console.error('Erreur lors de la connexion:', loginError);
            },
          });
        },
        error: (error) => {
          this.errorMessage =
            "Erreur lors de l'inscription. Veuillez réessayer.";
          console.error("Erreur lors de l'inscription:", error);
        },
      });
    }else {}
  }

forbiddenWordsValidator(control: AbstractControl): ValidationErrors | null {
    const forbidden = forbiddenWordsArray.some(word => control.value.includes(word));
    return forbidden ? { forbiddenWords: { value: control.value } } : null;
  }

}
