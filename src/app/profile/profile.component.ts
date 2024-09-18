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
  imageUrl: string = ''; // Ajoute cette propriété pour stocker l'URL de l'image

  ngOnInit(): void {
    this.loadUserData();
  }

  // Charger les informations de l'utilisateur
  loadUserData(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((data) => {
        this.user = data;
        this.imageUrl = this.user.picture ? `http://localhost:4200/${this.user.picture}` : ''; // Met à jour l'URL de l'image
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
