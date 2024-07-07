import { Component, inject } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  service = inject(UserService)
  
  public loginForm:FormGroup = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl('')
    
  })

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