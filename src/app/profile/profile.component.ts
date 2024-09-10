import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { AuthService } from "../shared/services/auth.service";
import { EntityService } from "../shared/services/entity.service";
import { OrderService } from "../shared/services/order.service";
import { UserInterface } from "../shared/models/IUser";
import { OrderInterface } from "../shared/models/order";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userService = inject(EntityService);
  authService = inject(AuthService);
  orderService = inject(OrderService);

  user: UserInterface | undefined;
  userId = this.authService.getDecodedToken().user_id;
  orders: OrderInterface[] = [];
  showDetailsForOrderId!: string;

  ngOnInit(): void {
    this.loadUserData();
  }

  // Charger les informations de l'utilisateur
  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
      
    });
  }

  // Charger les commandes de l'utilisateur
  // loadUserOrders(orderUris: string[]): void {
  //   orderUris.forEach((orderUri) => {
  //     this.orderService.getOrderByUri(orderUri).subscribe((order) => {
  //       console.log("Order Data:", order); 
  //       this.orders.push(order);
        
  //     });
  //   });
  // }

  // Afficher ou masquer les détails d'une commande
  toggleOrderDetails(orderId: string): void {
    if (this.showDetailsForOrderId === orderId) {
      this.showDetailsForOrderId = "";
    } else {
      this.showDetailsForOrderId = orderId;
    }
  }
}
