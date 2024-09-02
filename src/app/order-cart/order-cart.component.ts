import { Component, OnInit } from '@angular/core'; 
import { CartService } from '../shared/services/cart.service'; 
import { CommonModule } from '@angular/common'; 
import { CartInterface } from '../shared/models/CartInterface'; 
import { Router } from '@angular/router';
import { ItemInterface, OrderInterface } from '../shared/models/order';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { ItemService } from '../shared/services/item.service';

// Définition du composant Angular
@Component({
  selector: 'app-order-cart', 
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './order-cart.component.html', 
  styleUrls: ['./order-cart.component.css'], 
})
export class OrderCartComponent implements OnInit {

  // Tableau pour stocker les éléments du panier
  cartItems: CartInterface[] = [];
  
  // Tableau pour stocker les nouveaux éléments du panier (non utilisé dans le code fourni)
  newCartItem: ItemInterface[] = [];

  // Constructeur pour injecter les services nécessaires
  constructor(
    private cartService: CartService, 
    private router: Router, 
    private authService: AuthService, 
    private orderService: OrderService, 
    private itemService: ItemService
  ) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Charger les articles du panier depuis le service
    this.cartItems = this.cartService.getCartItems();
  }

  // Méthode pour changer la quantité d'un élément dans le panier
  changeQuantity(item: CartInterface, change: number): void {
    const newQuantity = Math.max(item.quantity + change, 1); // Assurer que la quantité ne soit pas inférieure à 1
    this.cartService.updateCartItemQuantity(item.id, newQuantity);
    // Recharger les articles mis à jour
    this.cartItems = this.cartService.getCartItems();
  }

  // Méthode pour retirer un élément du panier
  removeItem(item: CartInterface): void {
    this.cartService.removeCartItem(item.id);
    // Recharger les articles mis à jour
    this.cartItems = this.cartService.getCartItems();
  }

  // Méthode pour calculer le prix total de tous les éléments dans le panier
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.totalPrice * item.quantity), 
      0
    );
  }

  // Méthode pour valider la commande
  validateOrder(): void {
    // Afficher une boîte de dialogue de confirmation avant de procéder
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir valider votre commande ?');

    if (isConfirmed) {
      const token = this.authService.getDecodedToken(); // Obtenir le token décodé de l'utilisateur
    
      // Préparer les données de la commande
      const orderData: OrderInterface = {
        date: new Date().toISOString(), // Date actuelle
        status: `/api/statuses/${token.status_id}`, // Statut de la commande
        userOrder: `/api/users/${token.user_id}`, // ID de l'utilisateur
        totalPrice: this.getTotalPrice(), // Prix total de la commande
        items: [], // Les éléments seront ajoutés après la création de la commande
      };
    
      // Créer la commande dans le service
      this.orderService.createOrder(orderData).subscribe((order) => {
        // Une fois la commande créée, récupérer les éléments du panier
        this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        console.log(this.cartItems); // Affichage des éléments du panier pour vérification
    
        // Préparer les éléments de la commande
        const items: ItemInterface[] = this.cartItems.map((item) => ({
          orders: `/api/orders/${order.id}`, // Lien vers la commande
          productItem: item.product['@id'], // ID du produit
          serviceItem: item.service['@id'], // ID du service
          matterItem: item.matter['@id'], // ID de la matière
          quantity: item.quantity, // Quantité de l'élément
          totalPrice: item.totalPrice, // Prix total de l'élément
        }));
    
        // Sauvegarder chaque élément associé à la commande créée
        items.forEach((item) => {
          this.itemService.createItem(item).subscribe((createdItem) => {
            console.log(createdItem); // Affichage des éléments créés pour vérification
          });
        });
        
        // Message de confirmation après la validation
        alert('Votre commande a été validée avec succès !');

        // Redirection vers la page de profil après la validation
        this.router.navigate(['/profile']);
      });
    }
  }
}
