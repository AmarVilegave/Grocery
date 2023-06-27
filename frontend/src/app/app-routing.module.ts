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

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'about',component:AboutPageComponent },
  {path:'contact', component:ContactPageComponent},
  {path:'user-registration', component:UserRegistrationPageComponent},
  {path:'user-address', component:UserAddressComponent},
  {path:'product-management', component:ProductManagementComponent},
  {path:'admin-registration', component:AdminRegistrationComponent},
  {path:'category-management', component:CategoryManagementComponent},
  {path:'tags', component:TagsComponent},
  {path:'card', component:CardComponent},
  { path: 'card/:tag', component: CardComponent },
  { path: 'card/:tag/:category', component: CardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
