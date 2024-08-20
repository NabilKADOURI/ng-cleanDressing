import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { UserInterface } from '../shared/models/IUser';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { ItemInterface, OrderInterface } from '../shared/models/order';
import { ItemService } from '../shared/services/item.service';


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

  showDetailsForOrderId: number | null = null;
order: any;


  ngOnInit(): void {
    console.log('ngOnInit - Début');
    
    this.userService.getUserById(this.userId).subscribe((data) => {
      console.log('getUserById - Réponse reçue:', data);
      this.user = data;
  
      this.user.orders.forEach((orderUri) => {
        console.log('Traitement de la commande:', orderUri);
  
        this.orderService.getOrderByUri(orderUri).subscribe((order) => {
          console.log('getOrderByUri - Commande reçue:', order);
          this.orders.push(order);
          console.log('Liste des commandes après ajout:', this.orders);

          this.items[order.id!] = [];
          
          // Récupération des items pour chaque commande
          order.items.forEach((itemUri: ItemInterface) => {
            console.log('Traitement de l\'item:', item);
            
            this.itemService.getItemByUri(itemUri).subscribe((item)=>{
              this.items[order.id!].push(item);
            })
            
            console.log('Liste des items pour la commande', order.id, ':', this.items[order.id!]);
          });
        });
      });
    });
  
    console.log('ngOnInit - Fin');
  }

  toggleOrderDetails(orderId: string): void {
    const orderIdNumber = parseInt(orderId, 10); // Convertir en nombre
    
    if (this.showDetailsForOrderId === orderIdNumber) {
      this.showDetailsForOrderId = null;  // Masquer les détails si déjà ouvert
    } else {
      this.showDetailsForOrderId = orderIdNumber;  // Afficher les détails pour cette commande
    }
  }
}
