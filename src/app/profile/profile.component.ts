import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { UserInterface } from '../shared/models/IUser';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { ItemInterface, OrderInterface } from '../shared/models/order';
import { ItemService } from '../shared/services/item.service';
import { environment } from '../shared/environments/environment.development';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userService = inject(UserService);
  authService = inject(AuthService);
  orderService = inject(OrderService);
  itemService = inject(ItemService);

  user: UserInterface | undefined;
  userId = this.authService.getDecodedToken().user_id;

  orders: OrderInterface[] = [];
  items: { [orderId: string]: ItemInterface[] } = {};

  showDetailsForOrderId!: string;
  order: any;

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
    
      if (this.user && this.user.orders) {
        this.user.orders.forEach((orderUri) => {
          this.orderService.getOrderByUri(orderUri).subscribe((order) => {
            this.orders.push(order);
    
            // Initialiser la liste des items pour cette commande
            this.items[order.id!] = [];
    
            // Récupération des items pour chaque commande
            order.items.forEach((itemUri: string) => {
              this.fetchItemDetails(itemUri, order.id!);
            });
          });
        });
      } else {
        console.error("Orders is undefined or null");
      }
    });
  }
  
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
        orders:"",
        serviceItem:item.serviceItem,
        productItem:item.productItem,
        matterItem: item.matterItem,
        totalPrice: item.totalPrice,
        quantity: item.quantity || 1, // Utilise 1 si la quantité n'est pas définie
      });
    });
  }
  
toggleOrderDetails(orderId: string): void {
  // Si l'ordre en cours est cliqué à nouveau, on masque les détails
  if (this.showDetailsForOrderId === orderId) {
    this.showDetailsForOrderId = "";
  } else {
    this.showDetailsForOrderId = orderId;
    console.log(this.showDetailsForOrderId);
    
  }
}

 
}
