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
  errorMessage: string = '';

  constructor(
    private cartService: CartService, 
    private router: Router, 
    private authService: AuthService, 
    private orderService: OrderService, 
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }


  removeItem(item: CartInterface): void {
    this.cartService.removeCartItem(item.id);
    this.loadCartItems();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.totalPrice , 
      0
    );
  }

  validateOrder(): void {
    if (!this.authService.isLogged()) {
      this.handleNotLoggedError();
      return;
    }
  
    if (window.confirm('Êtes-vous sûr de vouloir valider votre commande ?')) {
      this.processOrder();
    }
  }

  private handleNotLoggedError(): void {
    this.errorMessage = 'Vous devez être connecté pour valider votre commande. Veuillez vous connecter ou vous inscrire.';
    setTimeout(() => {
      this.authService.setRedirectUrl(this.router.url);
      this.router.navigate(['/connexion']);
    }, 3000);
  }

  private processOrder(): void {
    const token = this.authService.getDecodedToken();
  
    const orderData: OrderInterface = {
      date: new Date().toISOString(),
      userOrder: `/api/users/${token.user_id}`,
      totalPrice: this.getTotalPrice(),
      items: [],
    };
  
    this.orderService.createOrder(orderData).subscribe((order) => {
      this.addItemsToOrder(order.id);
      alert('Votre commande a été validée avec succès !');
      this.cartService.clearCart();
      localStorage.removeItem('cartItems');
      this.loadCartItems();
      this.router.navigate(['/profile']);
    });
  }

  private addItemsToOrder(orderId: string): void {
    const items: ItemInterface[] = this.cartItems.map((item) => ({
      orders: `/api/orders/${orderId}`,
      productItem: item.product['@id'],
      serviceItem: item.service['@id'],
      matterItem: item.matter['@id'],
      quantity: item.quantity,
      price: item.totalPrice,
    }));

    items.forEach((item) => {
      this.itemService.createItem(item).subscribe();
    });
  }
}
