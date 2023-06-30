import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/userInterface/home/home.component';
import { AboutPageComponent } from './Components/userInterface/about-page/about-page.component';
import { ContactPageComponent } from './Components/userInterface/contact-page/contact-page.component';
import { UserRegistrationPageComponent } from './Components/userInterface/user-registration-page/user-registration-page.component';
import { UserAddressComponent } from './Components/userInterface/user-address/user-address.component';
import { ProductManagementComponent } from './Components/admin-interface/product-management/product-management.component';
import { AdminRegistrationComponent } from './Components/admin-interface/admin-registration/admin-registration.component';
import { CategoryManagementComponent } from './Components/admin-interface/category-management/category-management.component';
import { TagsComponent } from './Components/userInterface/tags/tags.component';
import { CardComponent } from './Components/userInterface/card/card.component';
import { AdminLoginComponent } from './Components/admin-interface/admin-login/admin-login.component';
import { UserLoginComponent } from './Components/userInterface/user-login/user-login.component';
import { AdminCategoriesPageComponent } from './Components/admin-interface/admin-categories-page/admin-categories-page.component';
import { AdminProductsPageComponent } from './Components/admin-interface/admin-products-page/admin-products-page.component';
import { AdminPageComponent } from './Components/admin-interface/admin-page/admin-page.component';
import { WishlistPageComponent } from './Components/userInterface/wishlist-page/wishlist-page.component';
import { ProductPageComponent } from './Components/userInterface/product-page/product-page.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'about',component:AboutPageComponent },
  {path:'contact', component:ContactPageComponent},
  {path:'user-registration', component:UserRegistrationPageComponent},
  {path:'user-address', component:UserAddressComponent},
  {path:'product-management', component:ProductManagementComponent},
  {path:'product-management/:id', component:ProductManagementComponent},
  {path:'admin-registration', component:AdminRegistrationComponent},
  {path:'category-management', component:CategoryManagementComponent},
  {path:'category-management/:id', component:CategoryManagementComponent},
  {path:'tags', component:TagsComponent},
  {path:'card', component:CardComponent},
  { path: 'card/:tag', component: CardComponent },
  { path: 'card/:tag/:category', component: CardComponent },
  {path:'admin-login', component:AdminLoginComponent},
  {path:'user-login', component:UserLoginComponent},
  {path:'admin',component:AdminPageComponent},
  {path:'admin-categories', component:AdminCategoriesPageComponent},
  {path:'admin-products', component:AdminProductsPageComponent},
  {path:'wishlist', component:WishlistPageComponent},
  {path:'product-page/:id', component:ProductPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
