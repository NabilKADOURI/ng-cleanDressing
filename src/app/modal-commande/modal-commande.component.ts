import { Component, ElementRef, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SolutionInterface } from '../shared/models/solution';
import { CategoryInterface } from '../shared/models/category';
import { ProductInterface } from '../shared/models/product';
import { MatterInterface } from '../shared/models/matter';
import { CartService } from '../shared/services/cart.service';
import { CartInterface } from '../shared/models/CartInterface';

@Component({
  selector: 'app-modal-commande',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-commande.component.html',
  styleUrls: ['./modal-commande.component.css'],
})
export class ModalCommandeComponent implements OnInit {

  @ViewChild('staticBackdrop') modal!: ElementRef;
  @Input() solutions!: SolutionInterface[];
  @Input() categories!: CategoryInterface[];
  @Input() products!: ProductInterface[];
  @Input() matters!: MatterInterface[];

  isModalOpen: boolean = false;

  public commandeForm:FormGroup = new FormGroup({
    service: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    matter: new FormControl('', Validators.required),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  filteredProducts: ProductInterface[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
  
    console.log(this.commandeForm.value.matter);
    
  }

  calculateTotalPrice(): number {
    const { service, product, matter, quantity } = this.commandeForm.value;
    const servicePrice = service?.price ?? 0;
    const productPrice = product?.price ?? 0;
    const matterPrice = matter?.price ?? 0;
    const quantityValue = quantity ?? 1;
    return (servicePrice + productPrice + matterPrice) * quantityValue;
  }

  private generateUniqueId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  }

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
      // Afficher des messages d'erreur plus détaillés
      Object.keys(this.commandeForm.controls).forEach(field => {
        const control = this.commandeForm.get(field);
        if (control && control.invalid) {
          console.log(`Erreur dans le champ ${field}:`, control.errors);
        }
      });
    }
  }

  goToCart(): void {
    this.closeModal(); // Fermer la modal
    setTimeout(() => {
      this.router.navigate(['/panier']); // Naviguer vers la page du panier après la fermeture de la modal
    }, 300); // Ajuster le délai si nécessaire
  }
  

  // Méthode pour ouvrir la modal
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.classList.remove('modal-open');
    const overlay = document.querySelector('.modal-backdrop');
    if (overlay) {
      overlay.remove();
    }
  }
  
}
