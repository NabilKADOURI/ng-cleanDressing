import { Component } from '@angular/core';
import { CategoryListComponent } from '../category-list/category-list.component';
import { HeroComponent } from '../hero/hero.component';
import { SolutionsComponent } from '../solutions/solutions.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoryListComponent,HeroComponent,SolutionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
