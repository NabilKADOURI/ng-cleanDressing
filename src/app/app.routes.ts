import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [

  { path:'',component: HomeComponent},
  { path:'category',component: CategoryListComponent},
  
];
