import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{

  price! : string | null;
  router = inject(Router);


ngOnInit(): void {
  this.price  = localStorage.getItem("price")
}

validatePaiment(){
  alert("Votre paiement a été éffectué")
  this.router.navigate(['/profile']);
}
}
