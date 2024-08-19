import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [

  { path:'',component: HomeComponent},
  { path:'category',component: CategoryListComponent},
  { path:'contact',component: ContactComponent},
  { path:'connexion',component: LoginComponent},
  { path:'article-details/:id',component: ArticleDetailComponent},
  { path:'register',component: RegisterComponent},
  { path: 'panier', component: OrderCartComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '**', redirectTo: '' },
];
