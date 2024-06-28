import { Component, OnInit } from '@angular/core';
import { CategoryInterface } from '../models/category';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../models/product';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

 categories: CategoryInterface[] = [];
 products: ProductInterface[] = [];

  constructor(private apiService: ApiService) {}

 
    ngOnInit(): void {
      this.apiService.getCategories().subscribe((data: CategoryInterface[]) => {
        this.categories = data;
      
    })
    this.apiService.getProducts().subscribe((data: ProductInterface[]) => {
      this.products = data;})
    }

    
}
