import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { SolutionInterface } from '../shared/models/solution';
import { CommonModule } from '@angular/common';
import { CategoryInterface } from '../shared/models/category';
import { ProductInterface } from '../shared/models/product';
import { MatterInterface } from '../shared/models/matter';
import { CartService } from '../shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-commande',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-commande.component.html',
  styleUrl: './modal-commande.component.css',
})
export class ModalCommandeComponent {
  // Stocke l'ID de la catégorie sélectionnée
  categoryIdSignal = signal<number | null>(null);

  // Stocke le service, produit et matière sélectionnés
  selectedServiceSignal = signal<SolutionInterface | null>(null);
  selectedProductSignal = signal<ProductInterface | null>(null);
  selectedMatterSignal = signal<MatterInterface | null>(null);

  // Stocke la quantité, minimum 1
  quantitySignal = signal<number>(1);

  // Stocke le prix total
  totalPriceSignal = signal<number>(0);

   // Référence à la modal
   @ViewChild('staticBackdrop') modal!: ElementRef;

  constructor(private cartService: CartService, private router: Router) {}

  // Gère le changement de catégorie
  updateCategory(event: any) {
    this.categoryIdSignal.set(+event.target.value);
    this.calculateTotalPrice();
  }

  // Gère la sélection d'un service
  selectService(service: SolutionInterface) {
    this.selectedServiceSignal.set(service);
    this.calculateTotalPrice();
  }

  // Gère la sélection d'un produit
  selectProduct(event: any) {
    const productId = +event.target.value;
    const selectedProduct = this.products.find(product => product.id === productId) || null;
    this.selectedProductSignal.set(selectedProduct);
    this.calculateTotalPrice();
  }

  // Gère la sélection d'une matière
  selectMatter(event: any) {
    const matterId = +event.target.value;
    const selectedMatter = this.matters.find(matter => matter.id === matterId) || null;
    this.selectedMatterSignal.set(selectedMatter);
    this.calculateTotalPrice();
  }

  // Gère la mise à jour de la quantité, minimum 1
  updateQuantity(event: any) {
    const quantity = Math.max(+event.target.value, 1);
    this.quantitySignal.set(quantity);
    this.calculateTotalPrice();
  }

  // Calcule le prix total en fonction des sélections et de la quantité
  calculateTotalPrice() {
    const servicePrice = this.selectedServiceSignal()?.price ?? 0;
    const productPrice = this.selectedProductSignal()?.price ?? 0;
    const matterPrice = this.selectedMatterSignal()?.price ?? 0;
    const quantity = this.quantitySignal() ?? 1;
    const totalPrice = (servicePrice + productPrice + matterPrice) * quantity;
    this.totalPriceSignal.set(totalPrice);
  }

  // Ferme la modal
  closeModal() {
    const modalElement = this.modal.nativeElement as HTMLElement;
    const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modalElement);
    if (bootstrapModal) {
      bootstrapModal.hide();
    }
  }

  addToCart() {
    const item = {
      service: this.selectedServiceSignal(),
      product: this.selectedProductSignal(),
      matter: this.selectedMatterSignal(),
      quantity: this.quantitySignal(),
      totalPrice: this.totalPriceSignal(),
    };
    this.cartService.addToCart(item);
  }

  // Ajoute les articles au panier et ferme le modal
  addToCartAndCloseModal() {
    this.addToCart();
    this.closeModal();
    this.router.navigate(['/panier']);
  }
  // Filtre les produits par catégorie sélectionnée
  getProductsByCategory(categoryId: number): ProductInterface[] {
    return this.products.filter(product => product.category && product.category.includes(categoryId.toString()));
  }

  // Inputs pour recevoir les données du composant parent
  @Input() solutions!: SolutionInterface[];
  @Input() categories!: CategoryInterface[];
  @Input() products!: ProductInterface[];
  @Input() matters!: MatterInterface[];
}
