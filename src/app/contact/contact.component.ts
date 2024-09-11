import { Component, inject, OnDestroy } from '@angular/core';
import { LocationInfoComponent } from './location-info/location-info.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../shared/services/contact.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LocationInfoComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnDestroy {
  
  serviceContact = inject(ContactService);
  router = inject(Router);
  
  private destroy$ = new Subject<void>();

  public contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    object: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.contactForm.valid) {
      this.serviceContact.registerContact(this.contactForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log('Réponse du message:', response);
            alert('Votre message a bien été envoyé !');
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Erreur lors de l\'envoi du message:', error);
            alert('Une erreur est survenue lors de l\'envoi du message.');
          }
        });
    } else {
      alert('Le formulaire est invalide. Veuillez vérifier les champs.');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
