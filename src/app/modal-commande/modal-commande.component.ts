import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SolutionInterface } from '../shared/models/solution';
import { CategoryInterface } from '../shared/models/category';
import { ProductInterface } from '../shared/models/product';
import { MatterInterface } from '../shared/models/matter';
import { CartService } from '../shared/services/cart.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-commande',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-commande.component.html',
  styleUrls: ['./modal-commande.component.css'],
})
export class ModalCommandeComponent implements OnInit, OnDestroy {

  @ViewChild('staticBackdrop') modal!: ElementRef;
  @Input() solutions!: SolutionInterface[];
  @Input() categories!: CategoryInterface[];
  @Input() products!: ProductInterface[];
  @Input() matters!: MatterInterface[];

  isModalOpen: boolean = false;

  public commandeForm: FormGroup = new FormGroup({
    service: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    matter: new FormControl('', Validators.required),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    depositDate: new FormControl('', Validators.required)
  });

  filteredProducts: ProductInterface[] = [];

  private destroy$ = new Subject<void>();

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    
  }
    
  calculateTotalPrice(): number {
    const { service, product, matter, quantity } = this.commandeForm.value;
    const servicePrice = service?.price ?? 0;
    const productPrice = product?.price ?? 0;
    const matterPrice = matter?.price ?? 0;
    return (servicePrice + productPrice + matterPrice) * (quantity ?? 1);
  }

  addOrderToCart(): void {
    if (this.commandeForm.valid) {
      const item = {
        ...this.commandeForm.value,
        totalPrice: this.calculateTotalPrice(),
      };
      this.cartService.addToCart(item);
  
      
      this.commandeForm.reset({ quantity: 1 });
      alert('Les éléments ont bien été ajoutés au panier.');
    } else {
      this.logFormErrors();
    }
  }

  private logFormErrors(): void {
    Object.keys(this.commandeForm.controls).forEach(field => {
      const control = this.commandeForm.get(field);
      if (control && control.invalid) {
        console.log(`Erreur dans le champ ${field}:`, control.errors);
      }
    });
  }

  goToCart(): void {
    this.closeModal();
    setTimeout(() => {
      this.router.navigate(['/panier']);
    }, 300);
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.classList.remove('modal-open');
    const overlay = document.querySelector('.modal-backdrop');
    if (overlay) {
      overlay.remove();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
