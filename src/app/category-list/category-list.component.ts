import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ModalCommandeComponent } from '../modal-commande/modal-commande.component';
import { CategoryInterface } from '../shared/models/category';
import { ProductInterface } from '../shared/models/product';
import { SolutionInterface } from '../shared/models/solution';
import { MatterInterface } from '../shared/models/matter';
import {EntityService} from '../shared/services/entity.service';
import { ApiListResponse } from '../shared/models/api';

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

  openAccordionId: number | null = null;

  service = inject(EntityService);

  // Variable pour suivre l'état des menus déroulants
  isAccordionOpen: boolean[] = [];

  ngOnInit(): void {

    this.getCategoriesWithProducts();

    this.isAccordionOpen = [];
    console.log(this.isAccordionOpen);
    
    this.FetchAllCategories();

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
      console.log(data);
      
    });
  }

  FetchAllMatters() {
    this.service.getMatter().subscribe((data) => {
      this.matters = data['hydra:member']; 
    });
  }

   // Récupérer les catégories et leurs produits
   getCategoriesWithProducts(): void {
    this.service.getCategory().subscribe((categoriesData: any) => {
      this.categories = categoriesData['hydra:member'];
  
      this.service.getProduct().subscribe((productsData: any) => {
        const products = productsData['hydra:member'];
  
        // Associer les produits à leur catégorie
        this.categories.forEach(category => {
          category.products = products.filter((product: { category: string; }) => product.category === `/api/categories/${category.id}`);
        });
      });
    });
  }
 
   // Méthode pour ouvrir/fermer l'accordéon
   toggleAccordion(categoryId: number) {
    this.openAccordionId = this.openAccordionId === categoryId ? null : categoryId;
  }

   // Vérifie si l'accordéon est ouvert pour une catégorie
   isOpen(categoryId: number): boolean {
    return this.openAccordionId === categoryId;
  }

  redirectToCommandeModal(): void {
    const modal = document.getElementById('commandeModal');
    if (modal) {
      modal.classList.add('show'); // Affiche la modal
      modal.style.display = 'block'; // Change le style du modal pour le montrer
    }
  }
   
}
