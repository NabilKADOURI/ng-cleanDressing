import {Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartInterface } from '../models/CartItem';



@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor (){}
  
  private cartItemsSubject = new BehaviorSubject<CartInterface[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(item: CartInterface) {
    const currentItems = this.cartItemsSubject.getValue();
    this.cartItemsSubject.next([...currentItems, item]);
  }

  getCartItems() {
    return this.cartItemsSubject.getValue();
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }
}

