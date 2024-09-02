// Importation des modules et services nécessaires
import { Component, inject } from '@angular/core';
import { LocationInfoComponent } from './location-info/location-info.component'; // Composant d'informations de localisation
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../shared/services/contact.service'; // Service pour gérer les contacts
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact', // Sélecteur du composant de contact
  standalone: true, // Composant autonome
  imports: [LocationInfoComponent, CommonModule, ReactiveFormsModule], // Modules importés pour le composant
  templateUrl: './contact.component.html', // Chemin du template HTML
  styleUrl: './contact.component.css' // Chemin du fichier de styles CSS
})
export class ContactComponent {

  // Injection du service de contact et du routeur
  serviceContact = inject(ContactService);
  router = inject(Router);

  // Déclaration du formulaire de contact avec ses contrôles et validations
  public contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required), // Champ de nom requis
    firstName: new FormControl('', Validators.required), // Champ de prénom requis
    email: new FormControl('', [Validators.required, Validators.email]), // Champ d'email requis avec validation de format
    object: new FormControl('', Validators.required), // Champ d'objet requis
    message: new FormControl('', Validators.required), // Champ de message requis
  });

  // Méthode de soumission du formulaire de contact
  onSubmit() {
    if (this.contactForm.valid) {
      // Appelle le service de contact avec les données du formulaire
      this.serviceContact.registerContact(this.contactForm.value).subscribe({
        next: (response) => {
          // En cas de succès de l'envoi du message
          console.log('Réponse du message:', response);
          alert('Votre message a bien été envoyé !');
          this.router.navigate(['/']); // Redirection vers la page d'accueil
        },
        error: (error) => {
          // En cas d'erreur lors de l'envoi du message
          console.error('Erreur lors de l\'envoi du message:', error);
          alert('Une erreur est survenue lors de l\'envoi du message.');
        }
      });
    } else {
      // Affiche un message si le formulaire est invalide
      alert('Le formulaire est invalide. Veuillez vérifier les champs.');
    }
  }
}
