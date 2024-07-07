import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ModalCommandeComponent } from "../modal-commande/modal-commande.component";
import { CategoryInterface } from "../shared/models/category";
import { ProductInterface } from "../shared/models/product";
import { SolutionInterface } from "../shared/models/solution";
import { MatterInterface } from "../shared/models/matter";
import { ApiService } from "../shared/services/api.service";
import { AuthService } from "../shared/services/auth.service";


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, CommonModule,ModalCommandeComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  // Variable pour stocker les données dans des tableaux vide
 categories: CategoryInterface[] = [];
 products: ProductInterface[] = [];
 Solutions: SolutionInterface[] = [];
 Matters: MatterInterface[] = [];

//  Permet d savoir si les menus déroulants sont ouvert ou fermé
 isAccordionOpen: boolean[] = []; 

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,

  ) {
    // initalisation des menus deroulants à fermés
    this.isAccordionOpen = []; 
  }

 
    ngOnInit(): void {

      // Récup des catégories depuis l'api
      this.apiService.fetchAllCategories().subscribe((data: CategoryInterface[]) => {
        this.categories = data;
        
    })

      // Récup des produits depuis l'api
    this.apiService.fetchAllProducts().subscribe((data: ProductInterface[]) => {
      this.products = data;
    })

      // Récup des services depuis l'api
    this.apiService.fetchAllSolutions().subscribe((data: SolutionInterface[]) => {
      this.Solutions = data;
    })

      // Récup des matieres depuis l'api
    this.apiService.fetchAllMatter().subscribe((data: MatterInterface[]) => {
      this.Matters = data;})
    }
  

    // === FONCTION POUR OUVRIR OU FERMER UN MENU DÉROULANT ===
  toggleAccordion(index:number): void {
    const currentState = this.isAccordionOpen[index]; // ÉTAT ACTUEL DU MENU CLIQUÉ
    this.isAccordionOpen.fill(false); // FERME TOUS LES MENUS DÉROULANTS
    this.isAccordionOpen[index] = !currentState; // OUVRE OU FERME LE MENU CLIQUÉ
  }

  getProductsByCategory(categoryId: number): { id: number, name: string, price: number, description: string }[] {
    return this.products
      .filter(product => product.category.includes(categoryId.toString())) // FILTRE LES PRODUITS APPARTENANT À LA CATÉGORIE
      .map(product => ({ id: product.id, name: product.name, price: product.price, description: product.description })); // RETOURNE LES PRODUITS FILTRÉS
  }

  goToLoginForm(): void {
    this.router.navigate(['/connexion']); // REDIRIGE VERS LA PAGE DE CONNEXION
  }

  redirectToCommandeModal(): void {
    if (this.authService.isLogged()) { // VÉRIFIE SI L'UTILISATEUR EST CONNECTÉ
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