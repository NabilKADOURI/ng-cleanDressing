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
  newCartItem: ItemInterface[] = [];

  // Le constructeur injecte le service CartService dans le composant
  constructor(private cartService: CartService,private router: Router, private authService: AuthService, private orderService: OrderService, private itemService: ItemService) {}

  ngOnInit(): void {
    // Charger les articles du panier depuis le service lors de l'initialisation
    this.cartItems = this.cartService.getCartItems();
  };

  changeQuantity(item: CartInterface, change: number) {
    const newQuantity = Math.max(item.quantity + change, 1);
    this.cartService.updateCartItemQuantity(item.id, newQuantity);
    // Recharger les articles mis à jour
    this.cartItems = this.cartService.getCartItems();
  };
  

  removeItem(item: CartInterface) {
    this.cartService.removeCartItem(item.id);
    // Recharger les articles mis à jour
    this.cartItems = this.cartService.getCartItems();
  };
  

  // Méthode pour calculer le prix total de tous les éléments dans le panier
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0) 
  };

  validateOrder() {
    const token = this.authService.getDecodedToken();
  
    // Préparer les données de la commande
    const orderData: OrderInterface = {
      date: new Date().toISOString(),
      status: `/api/statuses/${token.status_id}`,
      userOrder: `/api/users/${token.user_id}`,
      totalPrice: this.getTotalPrice(),
      items: [],
    };
  
    // Créer la commande d'abord
    this.orderService.createOrder(orderData).subscribe((order) => {
      // Une fois la commande créée, récupérer les éléments du panier
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

      console.log(this.cartItems);
      
  
      const items: ItemInterface[] = this.cartItems.map((item) => ({
        orders: `/api/orders/${order.id}`,
        productItem: item.product['@id'], 
        serviceItem: item.service['@id'],
        matterItem: item.matter['@id'],
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      }));
  
      // Sauvegarder chaque élément associé à la commande créée
      items.forEach((item) => {
        this.itemService.createItem(item).subscribe((createdItem) => {
          console.log(createdItem);
        });
      });
      
      // Redirection ou autre action après la validation
      this.router.navigate(['/confirmation']);
    });
  }
  

}