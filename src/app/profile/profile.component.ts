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
  userId: number  = this.authService.getDecodedToken().user_id;
  orders: OrderInterface[] = [];
  showDetailsForOrderId!: string;
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.loadUserData();
  }

  // Charger les informations de l'utilisateur
  loadUserData(): void {
    // console.log(this.userId);
    
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((data) => {
        this.user = data;
        console.log("profile : " + data);
      });
    }
  }

  onFileSelected(event: any): void { 
    const file = event.target.files[0];
   
    
    if (file) {
      this.selectedFile = file;
      console.log(file);
    }
  }
  
  uploadImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      console.log(formData);
      
  
      this.userService.uploadProfilePicture(this.userId, formData).subscribe(response => {
        console.log('Image téléchargée avec succès', response);
        this.loadUserData(); // Recharger les données de l'utilisateur après l'upload
      });
    }
  } 

  // Afficher ou masquer les détails d'une commande
  toggleOrderDetails(orderId :any): void {
    if (this.showDetailsForOrderId === orderId) {
      this.showDetailsForOrderId = "";
    } else {
      this.showDetailsForOrderId = orderId;
    }
  }
}
