import { Component, OnInit } from '@angular/core'; 
import { CartService } from '../shared/services/cart.service'; 
import { CommonModule } from '@angular/common'; 
import { CartInterface } from '../shared/models/CartInterface'; 
import { Router } from '@angular/router';
import { ItemInterface, OrderInterface } from '../shared/models/order';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { ItemService } from '../shared/services/item.service';

@Component({
  selector: 'app-order-cart', 
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './order-cart.component.html', 
  styleUrls: ['./order-cart.component.css'], 
})
export class OrderCartComponent implements OnInit {

  cartItems: CartInterface[] = [];
  newCartItem: ItemInterface[] = [];
  errorMessage: string = ''; // Variable pour stocker le message d'erreur

  constructor(
    private cartService: CartService, 
    private router: Router, 
    private authService: AuthService, 
    private orderService: OrderService, 
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  changeQuantity(item: CartInterface, change: number): void {
    const newQuantity = Math.max(item.quantity + change, 1);
    this.cartService.updateCartItemQuantity(item.id, newQuantity);
    this.cartItems = this.cartService.getCartItems();
  }

  removeItem(item: CartInterface): void {
    this.cartService.removeCartItem(item.id);
    this.cartItems = this.cartService.getCartItems();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.totalPrice * item.quantity), 
      0
    );
  }

  validateOrder(): void {
    if (!this.authService.isLogged()) {
      this.errorMessage = 'Vous devez être connecté pour valider votre commande. Veuillez vous connecter ou vous inscrire.';
      setTimeout(() => {
        this.authService.setRedirectUrl(this.router.url);
        this.router.navigate(['/connexion']);
      }, 3000); // Redirection après 2 secondes pour laisser le temps à l'utilisateur de lire le message
      return;
    }
  
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir valider votre commande ?');
  
    if (isConfirmed) {
      const token = this.authService.getDecodedToken();
  
      const orderData: OrderInterface = {
        date: new Date().toISOString(),
        status: `/api/statuses/${token.status_id}`,
        userOrder: `/api/users/${token.user_id}`,
        totalPrice: this.getTotalPrice(),
        items: [],
      };
  
      this.orderService.createOrder(orderData).subscribe((order) => {
        const items: ItemInterface[] = this.cartItems.map((item) => ({
          orders: `/api/orders/${order.id}`,
          productItem: item.product['@id'],
          serviceItem: item.service['@id'],
          matterItem: item.matter['@id'],
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        }));
  
        items.forEach((item) => {
          this.itemService.createItem(item).subscribe((createdItem) => {
            console.log(createdItem);
          });
        });
  
        alert('Votre commande a été validée avec succès !');
        
        // Vider le panier après la commande
        this.cartService.clearCart();
        this.cartItems = this.cartService.getCartItems(); // Recharger les articles du panier
  
        this.router.navigate(['/profile']);
      });
    }
  }
}
