import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-order-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css'],
})
export class OrderCartComponent implements OnInit {
  cartItems$ = this.cartService.cartItems$;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
}

