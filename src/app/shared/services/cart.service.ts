import { Injectable } from '@angular/core';
import { CartInterface } from '../models/CartInterface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { OrderInterface } from '../models/order';

@Injectable({
  providedIn: 'root',
})
// Service pour gérer les opérations liées au panier
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
    this.saveCartItems();
  }

  // Retourne la liste des articles du panier
  getCartItems(): CartInterface[] {
    return this.cartItems;
  }

  // Vide le panier et enregistre les modifications dans le stockage local
  clearCart() {
    this.cartItems = [];
    this.saveCartItems();
  }

  // Sauvegarde les articles du panier dans le stockage local
  public saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // Charge les articles du panier depuis le stockage local
  private loadCartItems() {
    const savedItems = localStorage.getItem('cartItems');
    this.cartItems = savedItems ? JSON.parse(savedItems) : [];
  }

  // Supprime un article du panier par son identifiant et enregistre les modifications
  removeCartItem(id: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.saveCartItems();
  }

  // Met à jour la quantité d'un article dans le panier par son identifiant
  updateCartItemQuantity(id: string, quantity: number) {
    const item = this.cartItems.find(item => item.id === id);
    if (item) {
      // Met à jour la quantité et le prix total de l'article
      item.quantity = quantity;
      item.totalPrice = (item.service?.price ?? 0) + (item.product?.price ?? 0) + (item.matter?.price ?? 0) * quantity;
      this.saveCartItems();
    }
  }
}
