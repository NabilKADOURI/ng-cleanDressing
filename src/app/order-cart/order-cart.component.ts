import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { CartInterface } from '../shared/models/CartInterface';
import { Router } from '@angular/router';
import { ItemInterface, OrderInterface } from '../shared/models/order';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { ItemService } from '../shared/services/item.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaymentComponent } from "../payment/payment.component";

@Component({
  selector: 'app-order-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css'],
})
export class OrderCartComponent implements OnInit, OnDestroy {
  cartItems: CartInterface[] = [];
  errorMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private itemService: ItemService
  ) {}

  userId: number | null = null;

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      const decodedToken = this.authService.getDecodedToken();
      if (decodedToken) {
        this.userId = decodedToken.user_id;
      }
    }

    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }


removeItem(item: CartInterface) {
 if(this.cartItems.length > 1){
  this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  localStorage.setItem("cartItems", JSON.stringify(this.cartItems))
 }else{
  this.cartItems = [];
  localStorage.removeItem("cartItems");
 }
}
    
  

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  validateOrder(): void {
    if (!this.authService.isLogged()) {
      this.handleNotLoggedError();
      return;
    }
      this.processOrder();
  }
  
  private handleNotLoggedError(): void {
    this.errorMessage =
      'Vous devez être connecté pour passer au paiement. Veuillez vous connecter ou vous inscrire.';
    setTimeout(() => {
      this.authService.setRedirectUrl(this.router.url);
      this.router.navigate(['/connexion']);
    }, 3000);
  }

  private processOrder(): void {
    if (this.userId) {
      const orderData: OrderInterface = {
        date: new Date().toISOString(),
        userOrder: `/api/users/${this.userId}`,
        totalPrice: this.getTotalPrice(),
        items: [],
      };

      this.orderService
        .createOrder(orderData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((order) => {
          localStorage.setItem('price', JSON.stringify(order.totalPrice))
          this.addItemsToOrder(order.id);
          localStorage.removeItem('cartItems');
          this.loadCartItems();
          this.router.navigate(['/paiement']);
        });
    }
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
      this.itemService
        .createItem(item)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
