import { Component, OnInit } from '@angular/core'; 
import { CartService } from '../shared/services/cart.service'; 
import { CommonModule } from '@angular/common'; 
import { CartInterface } from '../shared/models/CartInterface'; 
import { Router } from '@angular/router';
import { OrderInterface } from '../shared/models/order';

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

  // Le constructeur injecte le service CartService dans le composant
  constructor(private cartService: CartService,private router: Router) {}

  ngOnInit(): void {
    // Charger les articles du panier depuis le service lors de l'initialisation
    this.cartItems = this.cartService.getCartItems();
  }

  // Méthode pour changer la quantité d'un élément dans le panier
  changeQuantity(item: CartInterface, change: number) {
    // Calcul de la nouvelle quantité, en s'assurant qu'elle est toujours supérieure ou égale à 1
    const newQuantity = Math.max(item.quantity + change, 1);
    // Mise à jour de la liste des éléments du panier avec la nouvelle quantité et le nouveau prix total

    // Sauvegarder les éléments mis à jour dans le service
    this.cartService.saveCartItems();
    // Recharger les articles mis à jour
    this.cartItems = this.cartService.getCartItems();
    
  }

  // Méthode pour retirer un élément du panier
  removeItem(item: CartInterface) {
    // Filtrage des éléments du panier pour exclure l'élément à retirer
    const updatedItems = this.cartItems.filter(cartItem => cartItem !== item);
    
    // Sauvegarder les éléments mis à jour dans le service
    this.cartService.saveCartItems();
    // Recharger les articles mis à jour
    this.cartItems = this.cartService.getCartItems();
  }

  // Méthode pour calculer le prix total de tous les éléments dans le panier
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  validateOrder() {
    // Préparer les données de la commande
    const orderData:OrderInterface = {
      date: new Date().toISOString(), 
      status: 'pending',
      totalPrice: this.getTotalPrice(),
      items: this.cartItems.map(item => ({
        product: item.product,
        service: item.service,
        matter:item.matter, 
        quantity: item.quantity,
        totalPrice: item.totalPrice
      }))
    };
  
    // Appeler le service pour créer la commande
    this.cartService.createOrder(orderData).subscribe({
      next: (response) => {
        console.log('Commande validée avec succès', response);
        this.cartService.clearCart();  // Vider le panier après la commande
        this.router.navigate(['/confirmation']);  // Rediriger vers une page de confirmation
      },
      error: (error) => {
        console.error('Erreur lors de la validation de la commande', error);
      }
    });
}}