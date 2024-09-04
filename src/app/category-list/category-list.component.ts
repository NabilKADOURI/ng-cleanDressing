import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ModalCommandeComponent } from '../modal-commande/modal-commande.component';
import { CategoryInterface } from '../shared/models/category';
import { ProductInterface } from '../shared/models/product';
import { SolutionInterface } from '../shared/models/solution';
import { MatterInterface } from '../shared/models/matter';
import { AuthService } from '../shared/services/auth.service';
import {
  CategoryServiceToken,
  EntityService,
  MatterServiceToken,
  ProductServiceToken,
  SolutionServiceToken,
} from '../shared/services/entity.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, CommonModule, ModalCommandeComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  // Déclaration des services injectés via les tokens
  constructor(
    @Inject(CategoryServiceToken)
    private serviceCategories: EntityService<CategoryInterface>,
    @Inject(ProductServiceToken)
    private serviceProducts: EntityService<ProductInterface>,
    @Inject(SolutionServiceToken)
    private serviceSolutions: EntityService<SolutionInterface>,
    @Inject(MatterServiceToken)
    private serviceMatters: EntityService<MatterInterface>,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialisation des variables
    this.isAccordionOpen = [];
  }

  // Variables pour stocker les données
  categories: CategoryInterface[] = [];
  products: ProductInterface[] = [];
  Solutions: SolutionInterface[] = [];
  Matters: MatterInterface[] = [];

  // Variable pour suivre l'état des menus déroulants
  isAccordionOpen: boolean[] = [];

  // Carte pour stocker les produits par catégorie
  productsByCategoryMap: { [categoryId: number]: ProductInterface[] } = {};

  ngOnInit(): void {
    // Récupération des catégories depuis le service
    this.serviceCategories.fetchAll().subscribe((data) => {
      this.categories = data['hydra:member'];
      // initialisation de l'état des accordéons
      this.isAccordionOpen = new Array(this.categories.length).fill(false);
    });
    
    // Récupération des produits depuis le service
    this.serviceProducts.fetchAll().subscribe((data) => {
      this.products = data['hydra:member'];
      // Création de la carte des produits par catégorie après récupération
      this.createProductsByCategoryMap();
    });
    
    // Récupération des solutions depuis le service
    this.serviceSolutions.fetchAll().subscribe((data) => {
      this.Solutions = data['hydra:member'];
    });
    
    // Récupération des matières depuis le service
    this.serviceMatters.fetchAll().subscribe((data) => {
      this.Matters = data['hydra:member'];
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
  

  /**
   * Redirige l'utilisateur vers la page de connexion
   */
  // goToLoginForm(): void {
  //   this.router.navigate(['/connexion']); // Redirection vers la page de connexion
  // }

  /**
   * Redirige vers le modal de commande si l'utilisateur est connecté
   */
  // redirectToCommandeModal(): void {
  //   if (this.authService.isLogged()) {
  //     // Vérifie si l'utilisateur est connecté
  //     const modal = document.getElementById('commandeModal');
  //     if (modal) {
  //       modal.classList.add('show'); // Affiche le modal
  //       modal.style.display = 'block'; // Change le style du modal pour le montrer
  //     }
  //   } else {
  //     this.goToLoginForm(); // Redirige vers le formulaire de connexion si l'utilisateur n'est pas connecté
  //   }
  // }


}
