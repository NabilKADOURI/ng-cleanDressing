import { Injectable } from '@angular/core';
import { CartInterface } from '../models/CartInterface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { OrderInterface } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // URL de l'API pour les commandes
  private url = environment.apiBaseUrl;
  // Liste des articles dans le panier, initialement vide
  private cartItems: CartInterface[] = [];

  constructor(private http: HttpClient) {
    // Charger les articles du panier depuis le stockage local lors de l'initialisation
    this.loadCartItems();
  }

  // Crée une nouvelle commande en envoyant les données de la commande à l'API
  createOrder(orderData: OrderInterface): Observable<any> {
    return this.http.post(`${this.url}/api/orders`, orderData);
  }

  // Ajoute un article au panier et enregistre les modifications dans le stockage local
  addToCart(item: CartInterface) {
    this.cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // Retourne la liste des articles du panier
  getCartItems(): CartInterface[] {
    return this.cartItems;
  }

  // Charge les articles du panier depuis le stockage local
  private loadCartItems() {
    const savedItems = localStorage.getItem('cartItems');
    this.cartItems = savedItems ? JSON.parse(savedItems) : [];
  }
}
