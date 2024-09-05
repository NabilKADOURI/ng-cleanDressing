import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Importation des interfaces et services nécessaires
import { SolutionInterface } from '../shared/models/solution';
import { CategoryInterface } from '../shared/models/category';
import { ProductInterface } from '../shared/models/product';
import { MatterInterface } from '../shared/models/matter';
import { CartService } from '../shared/services/cart.service';


// Déclaration du composant Angular
@Component({
  selector: 'app-modal-commande',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-commande.component.html',
  styleUrls: ['./modal-commande.component.css'],
})
export class ModalCommandeComponent implements OnInit {

  // Référence à l'élément de modal pour manipuler son affichage
  @ViewChild('staticBackdrop') modal!: ElementRef;
  
  // Propriétés d'entrée pour les données nécessaires
  @Input() solutions!: SolutionInterface[];
  @Input() categories!: CategoryInterface[];
  @Input() products!: ProductInterface[];
  @Input() matters!: MatterInterface[];

  // État de la modal (ouverte ou fermée)
  isModalOpen: boolean = false;

  // Définition du formulaire avec des contrôles et des validateurs
  public commandeForm: FormGroup = new FormGroup({
    service: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    matter: new FormControl('', Validators.required),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    depositDate: new FormControl('', Validators.required) // Champ pour la date de dépôt
  });

  filteredProducts: ProductInterface[] = [];

  // Injection des services nécessaires
  constructor(private cartService: CartService, private router: Router) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    console.log(this.commandeForm.value.matter); // Affichage des données du formulaire pour le débogage
  }

  // Calcul du prix total en fonction des valeurs du formulaire
  calculateTotalPrice(): number {
    const { service, product, matter, quantity } = this.commandeForm.value;
    const servicePrice = service?.price ?? 0;
    const productPrice = product?.price ?? 0;
    const matterPrice = matter?.price ?? 0;
    const quantityValue = quantity ?? 1;
    return (servicePrice + productPrice + matterPrice) * quantityValue;
  }

  // Génération d'un identifiant unique pour les éléments du panier
  private generateUniqueId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  }

  // Méthode pour ajouter les éléments au panier
  addToCart(): void {
    if (this.commandeForm.valid) {
      console.log('Formulaire valide. Données de la commande:', this.commandeForm.value);
      const item = {
        id: this.generateUniqueId(),
        ...this.commandeForm.value,
        totalPrice: this.calculateTotalPrice(),
      };
      console.log('Article ajouté au panier:', item);
      this.cartService.addToCart(item);
      this.commandeForm.reset({ quantity: 1 });
      alert('Les éléments ont bien été ajoutés au panier.');
    } else {
      // Affichage des erreurs de validation du formulaire
      Object.keys(this.commandeForm.controls).forEach(field => {
        const control = this.commandeForm.get(field);
        if (control && control.invalid) {
          console.log(`Erreur dans le champ ${field}:`, control.errors);
        }
      });
    }
  }

  // Méthode pour rediriger vers la page du panier
  goToCart(): void {
    this.closeModal(); // Fermer la modal avant la redirection
    setTimeout(() => {
      this.router.navigate(['/panier']); // Naviguer vers la page du panier après la fermeture de la modal
    }, 300); // Délai pour permettre à la modal de se fermer
  }

  // Méthode pour ouvrir la modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Méthode pour fermer la modal
  closeModal(): void {
    this.isModalOpen = false;
    document.body.classList.remove('modal-open');
    const overlay = document.querySelector('.modal-backdrop');
    if (overlay) {
      overlay.remove();
    }
  }
}
