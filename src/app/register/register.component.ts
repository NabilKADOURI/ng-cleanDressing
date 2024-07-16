import { Component, inject } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {

  service = inject(UserService)
  
  public loginForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required), 
    firstName: new FormControl('', Validators.required), 
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]), 
    adress: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', [Validators.required, Validators.minLength(6)]) 
  });

  onSubmit() {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      this.service.register(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          console.log(this.loginForm.value);
        },
        error: (error) => {
          console.error('Erreur inscription', error);
          console.log(this.loginForm.value);
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
