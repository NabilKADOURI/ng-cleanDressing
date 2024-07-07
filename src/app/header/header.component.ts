import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private elementRef: ElementRef) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const logoHeight = this.elementRef.nativeElement.querySelector('.logo-container').offsetHeight;
    const navbar = this.elementRef.nativeElement.querySelector('#mainNavbar');
    if (window.pageYOffset > logoHeight) {
      navbar.classList.add('fixed-navbar');
    } else {
      navbar.classList.remove('fixed-navbar');
    }
  }
  
  service = inject(AuthService)

  logout() {
  this.service.logout();
  }


}
