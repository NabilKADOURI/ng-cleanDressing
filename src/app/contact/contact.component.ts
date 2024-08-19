import { Component, inject } from '@angular/core';
import { LocationInfoComponent } from './location-info/location-info.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../shared/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LocationInfoComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

serviceContact = inject(ContactService);
router = inject(Router);


public contactForm: FormGroup = new FormGroup({

  name: new FormControl('', Validators.required), 
  firstName: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  object: new FormControl('',Validators.required,), 
  message: new FormControl('',Validators.required), 
  
});

onSubmit() {
  if (this.contactForm.valid) {
    this.serviceContact.registerContact(this.contactForm.value).subscribe({
      next: (response) => {
       
        console.log('Réponse du message:', response); 
        alert('Votre message à bien était envoyé !');
        this.router.navigate(['/']);  
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoie du message:', error); 
        alert('Une erreur est survenue lors de l\'envoie du message.'); 
      }
      
    });
  } else {
    alert('Le formulaire est invalide. Veuillez vérifier les champs.');
  }
}

  

}
