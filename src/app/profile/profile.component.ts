import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { AuthService } from "../shared/services/auth.service";
import { EntityService } from "../shared/services/entity.service";
import { OrderService } from "../shared/services/order.service";
import { UserInterface } from "../shared/models/IUser";
import { OrderInterface } from "../shared/models/order";
import { environment } from "../shared/environments/environment";
import { StatusColorPipe } from "../shared/pipes/status-color.pipe";



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, StatusColorPipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit{
  userService = inject(EntityService);
  authService = inject(AuthService);
  orderService = inject(OrderService);

  user: UserInterface | undefined;
  userId: any= this.authService.getDecodedToken();
  orders: OrderInterface[] = [];
  showDetailsForOrderId!: string;
  selectedFile: File | null = null;
  imageUrl = environment.urlPicture 

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      const decodedToken = this.authService.getDecodedToken();
      if (decodedToken) {
        this.userId = decodedToken.user_id;
        
      }
    }
    this.loadUserData();
  }

  // Charger les informations de l'utilisateur
  loadUserData(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((data) => {
        this.user = data;
        console.log(this.imageUrl + data.picture);
        
        console.log("profile : ", data);
      });
    }
  }

  onFileSelected(event: any): void { 
    const file = event.target.files[0]; 
    if (file) {
        this.selectedFile = file;
        console.log("Image sélectionnée : ", file);
    }
}

  uploadImage(): void {
    if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        console.log("FormData :", formData);

        // Appel au service qui envoie l'image
        this.userService.uploadProfilePicture(this.userId, formData).subscribe({
            next: (response) => {
                console.log('Image téléchargée avec succès', response);
                this.loadUserData(); // Recharger les données de l'utilisateur, ce qui mettra à jour l'URL de l'image
            },
            error: (err) => {
                console.error('Erreur lors du téléchargement', err);
            }
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
