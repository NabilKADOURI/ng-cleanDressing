import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ModalCommandeComponent } from '../modal-commande/modal-commande.component';
import { CategoryInterface } from '../shared/models/category';
import { ProductInterface } from '../shared/models/product';
import { SolutionInterface } from '../shared/models/solution';
import { MatterInterface } from '../shared/models/matter';
import { AuthService } from '../shared/services/auth.service';
import {CategoryServiceToken,EntityService,MatterServiceToken,ProductServiceToken,SolutionServiceToken,
} from '../shared/services/entity.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, CommonModule, ModalCommandeComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  constructor(
    @Inject(CategoryServiceToken)
    private serviceCategories: EntityService<CategoryInterface>,
    @Inject(ProductServiceToken)
    private serviceProducts: EntityService<ProductInterface>,
    @Inject(SolutionServiceToken)
    private serviceSolutions: EntityService<SolutionInterface>,
    @Inject(MatterServiceToken)
    private serviceMatters : EntityService<MatterInterface>,
    private authService: AuthService,
    private router: Router
  ) {
    this.isAccordionOpen = [];
  }

  // Variable pour stocker les données dans des tableaux vide
  categories: CategoryInterface[] = [];
  products: ProductInterface[] = [];
  Solutions: SolutionInterface[] = [];
  Matters: MatterInterface[] = [];

  //  Permet de savoir si les menus déroulants sont ouvert ou fermé
  isAccordionOpen: boolean[] = [];

  ngOnInit(): void {
    this.serviceCategories.fetchAll().subscribe((data) => {
      this.categories = data['hydra:member'];
      // this.isAccordionOpen = new Array(this.categories.length).fill(false);
    });
    
    this.serviceProducts.fetchAll().subscribe((data) => {
      this.products = data['hydra:member'];
      // console.log('Fetched products:', this.products);
      this.createProductsByCategoryMap(); // Créer la carte des produits par catégorie après récupération
    });
    
    this.serviceSolutions.fetchAll().subscribe((data) => {
      this.Solutions = data['hydra:member'];
    });
    
    this.serviceMatters.fetchAll().subscribe((data) => {
      this.Matters = data['hydra:member'];
    });

  }
  
  productsByCategoryMap: { [categoryId: number]: ProductInterface[] } = {};

  createProductsByCategoryMap(): void {
    // console.log('Creating Products by Category Map...');
  
    this.productsByCategoryMap = this.products.reduce((acc, product) => {
      // Extract category ID from URL
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
  
    // console.log('Products by Category Map:', this.productsByCategoryMap);
  }
  
  
toggleAccordion(index: number): void {
  console.log('Toggling accordion at index:', index); // Vérifiez si le clic est détecté
  this.isAccordionOpen[index] = !this.isAccordionOpen[index];
  console.log('Accordion state:', this.isAccordionOpen); // Vérifiez l'état après le clic
}

getProductsByCategory(categoryId: number | null): ProductInterface[] {
  const products = categoryId ? this.productsByCategoryMap[categoryId] || [] : [];
  // console.log(`Products for category ${categoryId}:`, products);
  return products;
}

  

  goToLoginForm(): void {
    this.router.navigate(['/connexion']); // REDIRIGE VERS LA PAGE DE CONNEXION
  }

  redirectToCommandeModal(): void {
    if (this.authService.isLogged()) {
      // VÉRIFIE SI L'UTILISATEUR EST CONNECTÉ
      const modal = document.getElementById('commandeModal');
      if (modal) {
        modal.classList.add('show'); // AFFICHE LE MODAL
        modal.style.display = 'block'; // CHANGE LE STYLE DU MODAL POUR LE MONTRER
      }
    } else {
      this.goToLoginForm(); // REDIRIGE VERS LE FORMULAIRE DE CONNEXION SI L'UTILISATEUR N'EST PAS CONNECTÉ
    }
  }
}
