import { Component } from '@angular/core';
import { CategoryListComponent } from '../category-list/category-list.component';
import { HeroComponent } from './hero/hero.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ArticlesComponent } from '../articles/articles.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,SolutionsComponent,TestimonialComponent,ArticlesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
