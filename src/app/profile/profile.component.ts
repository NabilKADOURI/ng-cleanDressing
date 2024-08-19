import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { UserInterface } from '../shared/models/IUser';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { OrderInterface } from '../shared/models/order';


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
  user: UserInterface | undefined;
  userId = this.authService.getDecodedToken().user_id;

  orderService = inject(OrderService);
  orders: OrderInterface[] = [];

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data; 
    
    this.user.orders.forEach((order)=>{
      this.orderService.getOrderByUri(order).subscribe((dataOrder)=>{
        this.orders.push(dataOrder);
        console.log("data :" + dataOrder);
        

      });
    });
      
    });

    console.log( this.orders);
    
  }





  
}
