import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ModalCommandeComponent } from '../modal-commande/modal-commande.component';
import { CategoryInterface } from '../shared/models/category';
import { ProductInterface } from '../shared/models/product';
import { SolutionInterface } from '../shared/models/solution';
import { MatterInterface } from '../shared/models/matter';
import { AuthService } from '../shared/services/auth.service';
import {EntityService} from '../shared/services/entity.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, CommonModule, ModalCommandeComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {

  // Variables pour stocker les données
  categories: CategoryInterface[] = [];
  products: ProductInterface[] = [];
  solutions: SolutionInterface[] = [];
  matters: MatterInterface[] = [];

  service = inject(EntityService);

  // Variable pour suivre l'état des menus déroulants
  isAccordionOpen: boolean[] = [];

  // Carte pour stocker les produits par catégorie
  productsByCategoryMap: { [categoryId: number]: ProductInterface[] } = {};

  ngOnInit(): void {

    this.isAccordionOpen = [];

    this.FetchAllCategories();

    this.FetchAllProducts()

    this.FetchAllMatters();

    this.FetchAllSolutions();
  }

  // Méthode pour récupérer toutes les solutions depuis le service
  FetchAllSolutions() {
    // Appel de la méthode fetchAll du service EntityService
    this.service.getService().subscribe((data) => {
      // Attribution des données reçues à la propriété solutions
      this.solutions = data['hydra:member'];
    });
  }

  FetchAllCategories() {
    this.service.getCategory().subscribe((data) => {
      this.categories= data['hydra:member'];
      this.isAccordionOpen = new Array(this.categories.length).fill(false); 
    });
  }

  FetchAllProducts() {
    this.service.getProduct().subscribe((data) => {
      this.products = data['hydra:member']; 
    });
  }

  FetchAllMatters() {
    this.service.getMatter().subscribe((data) => {
      this.matters = data['hydra:member']; 
    });
  }

  
  /**
   * Crée une carte des produits par catégorie
   */
  createProductsByCategoryMap(): void {
    this.productsByCategoryMap = this.products.reduce((acc, product) => {
      // Extraction de l'ID de la catégorie depuis l'URL du produit
      const categoryUrl = product.category;
      const categoryId = categoryUrl ? parseInt(categoryUrl.split('/').pop() ?? '', 10) : null;
      if (categoryId) {
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push(product);
      }
      return acc;
    }, {} as { [categoryId: number]: ProductInterface[] });
  }
  
  /**
   * Bascule l'état ouvert/fermé des menus déroulants
   * @param index Index du menu déroulant
   */
  toggleAccordion(index: number): void {
    console.log('Toggling accordion at index:', index); // Vérifiez si le clic est détecté
    this.isAccordionOpen[index] = !this.isAccordionOpen[index];
    console.log('Accordion state:', this.isAccordionOpen); // Vérifiez l'état après le clic
  }

  /**
   * Récupère les produits pour une catégorie donnée
   * @param categoryId ID de la catégorie
   * @returns Liste des produits pour la catégorie
   */
  getProductsByCategory(categoryId: number | null): ProductInterface[] {
    return categoryId ? this.productsByCategoryMap[categoryId] || [] : [];
  }

  redirectToCommandeModal(): void {
    const modal = document.getElementById('commandeModal');
    if (modal) {
      modal.classList.add('show'); // Affiche la modal
      modal.style.display = 'block'; // Change le style du modal pour le montrer
    }
  }
  




}
