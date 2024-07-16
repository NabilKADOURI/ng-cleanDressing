import { Component, Input, input, signal } from '@angular/core';
import { SolutionInterface } from '../shared/models/solution';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryInterface } from '../shared/models/category';
import { ProductInterface } from '../shared/models/product';
import { MatterInterface } from '../shared/models/matter';
import { ValueChangeEvent } from '@angular/forms';

@Component({
  selector: 'app-modal-commande',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-commande.component.html',
  styleUrl: './modal-commande.component.css',
})
export class ModalCommandeComponent {
  categoryIdSignal = signal(null);

  updateCategory(e: any) {
    this.categoryIdSignal.set(e.target.value);
    console.log('catégorie changée : ', e.target.value);
  }

  @Input() solutions!: SolutionInterface[];
  @Input() categories!: CategoryInterface[];
  @Input() products!: ProductInterface[];
  @Input() matters!: MatterInterface[];

  getProductsByCategory(categoryId: number): {
    id: number;
    name: string;
    price: number;
    description: string;
    picture: string;
  }[] {
    return this.products
      .filter(
        (product) =>
          product.category && product.category.includes(categoryId.toString())
      ) // Vérifie que product.category est défini
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        picture: product.picture,
      })); // Retourne les produits filtrés
  }
}
