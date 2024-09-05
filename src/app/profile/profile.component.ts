import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserInterface } from '../shared/models/IUser';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { ItemInterface, OrderInterface } from '../shared/models/order';
import { ItemService } from '../shared/services/item.service';
import { environment } from '../shared/environments/environment.development';
import { EntityService } from '../shared/services/entity.service';

// Définition du composant Angular
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  // Injection des services nécessaires
  userService = inject(EntityService);
  authService = inject(AuthService);
  orderService = inject(OrderService);
  itemService = inject(ItemService);

  // Déclaration des propriétés du composant
  user: UserInterface | undefined;
  userId = this.authService.getDecodedToken().user_id;
  orders: OrderInterface[] = [];
  items: { [orderId: string]: ItemInterface[] } = {};
  showDetailsForOrderId!: string;
  order: any;

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.loadUserData();
  }

  // Fonction pour charger les données de l'utilisateur
  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
      if (this.user && this.user.orders) {
        this.loadUserOrders(this.user.orders);
      } else {
        console.error("Orders is undefined or null");
      }
    });
  }

  // Fonction pour charger les commandes de l'utilisateur
  loadUserOrders(orderUris: string[]): void {
    orderUris.forEach((orderUri) => {
      this.orderService.getOrderByUri(orderUri).subscribe((order) => {
        this.orders.push(order);
        this.items[order.id!] = [];
        console.log(this.orders);
        order.items.forEach((itemUri: string) => {
          this.fetchItemDetails(itemUri, order.id!);
        });
      });
    });
  }

  // Fonction pour récupérer les détails des articles de la commande
  fetchItemDetails(itemUri: string, orderId: string): void {
    this.itemService.getItemByUri(environment.apiBaseUrl + itemUri).subscribe((item) => {
      let itemName = "";
      if (itemUri.includes('/api/services/')) {
        itemName = `Service ${item.serviceItem}`;
      } else if (itemUri.includes('/api/products/')) {
        itemName = `Produit ${item.productItem}`;
      } else if (itemUri.includes('/api/matters/')) {
        itemName = `Matière ${item.matterItem}`;
      }
      this.items[orderId].push({
        orders: "",
        serviceItem: item.serviceItem,
        productItem: item.productItem,
        matterItem: item.matterItem,
        totalPrice: item.totalPrice,
        quantity: item.quantity || 1, 
      });
    });
  }

  // Fonction pour afficher ou masquer les détails de la commande
  toggleOrderDetails(orderId: string): void {
    if (this.showDetailsForOrderId === orderId) {
      this.showDetailsForOrderId = "";
    } else {
      this.showDetailsForOrderId = orderId;
      console.log(this.showDetailsForOrderId);
    }
  }
}
