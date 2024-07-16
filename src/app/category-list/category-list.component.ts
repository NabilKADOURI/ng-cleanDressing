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
  constructor(
    @Inject(CategoryServiceToken)
    private serviceCategories: EntityService<CategoryInterface>,
    @Inject(ProductServiceToken)
    private serviceProducts: EntityService<ProductInterface>,
    @Inject(SolutionServiceToken)
    private serviceSolutuions: EntityService<SolutionInterface>,
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
    // Récup des catégories depuis l'api
    this.serviceCategories.fetchAll().subscribe((data) => {
      console.log(data);
      this.categories = data['hydra:member'];
    });

    // Récup des produits depuis l'api
    this.serviceProducts.fetchAll().subscribe((data) => {
      console.log(data);
      this.products = data['hydra:member'];
    });

    // Récup des services depuis l'api
    this.serviceSolutuions.fetchAll().subscribe((data) => {
      console.log(data);
      this.Solutions = data['hydra:member'];
    });
    // console.log(this.categories, this.products, this.Matters);
  }

  // === FONCTION POUR OUVRIR OU FERMER UN MENU DÉROULANT ===
  toggleAccordion(index: number): void {
    const currentState = this.isAccordionOpen[index]; // ÉTAT ACTUEL DU MENU CLIQUÉ
    this.isAccordionOpen.fill(false); // FERME TOUS LES MENUS DÉROULANTS
    this.isAccordionOpen[index] = !currentState; // OUVRE OU FERME LE MENU CLIQUÉ
  }

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
