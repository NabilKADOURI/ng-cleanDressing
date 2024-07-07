import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({}); 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      credentials: new FormGroup({
        username: new FormControl('', [ Validators.minLength(2)]),
        password: new FormControl('', [Validators.required, Validators.minLength(2)]),
      }),
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value.credentials;
      this.authService.login({ username, password }).subscribe(
        (token) => {
          console.log('Token received:', token); // Pour déboguer
          this.authService.saveToken(token.token);
          this.router.navigate(['/category']); // Redirection après connexion réussie
        },
        error => {
          console.error('Login failed', error);
          // Gérer les erreurs de connexion ici (par exemple, afficher un message d'erreur)
        }
      );
    }
  }


  goToLoginForm(): void {
    this.router.navigate(['/connexion']);
  }

 

}
