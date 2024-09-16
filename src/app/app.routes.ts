import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ArticleDetailComponent } from './home/articles/article-detail/article-detail.component';
import { ContactComponent } from './contact/contact.component';
// import { RegisterComponent } from './register/register.component';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { ProfileComponent } from './profile/profile.component';
import { TipsComponent } from './tips/tips.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'article-details/:id', component: ArticleDetailComponent },
  { path: 'panier', component: OrderCartComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'conseil', component: TipsComponent },
  { path: '**', redirectTo: '' },
];
