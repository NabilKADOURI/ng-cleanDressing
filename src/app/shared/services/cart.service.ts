import { Injectable } from '@angular/core';
import { CartInterface } from '../models/CartInterface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { OrderInterface } from '../models/order';

@Injectable({
  providedIn: 'root',
})
// Interface pour définir la structure des articles du panier
export class CartService {
  private url = environment.apiBaseUrl;
  // Tableau pour stocker les articles du panier
  private cartItems: CartInterface[] = [];

  constructor(private http: HttpClient) {
    // Charger les articles du panier depuis le stockage local lors de l'initialisation
    this.loadCartItems();
  }

  createOrder(orderData: OrderInterface): Observable<any> {
    return this.http.post(`${this.url}/api/orders`, orderData);
  }

  // Méthode pour ajouter un article au panier
  addToCart(item: CartInterface) {
    this.cartItems.push(item);
    this.saveCartItems();
  }

  // Méthode pour obtenir tous les articles du panier
  getCartItems(): CartInterface[] {
    return this.cartItems;
  }

  // Méthode pour vider le panier
  clearCart() {
    this.cartItems = [];
    this.saveCartItems();
  }

  // Méthode pour sauvegarder les articles du panier dans le stockage local
  public saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // Méthode pour charger les articles du panier depuis le stockage local
  private loadCartItems() {
    const savedItems = localStorage.getItem('cartItems');
    this.cartItems = savedItems ? JSON.parse(savedItems) : [];
  }
}
