import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/userInterface/home/home.component';
import { AboutPageComponent } from './Components/userInterface/about-page/about-page.component';
import { ContactPageComponent } from './Components/userInterface/contact-page/contact-page.component';
import { UserRegistrationPageComponent } from './Components/userInterface/user-registration-page/user-registration-page.component';
import { UserAddressComponent } from './Components/userInterface/user-address/user-address.component';
import { ProductManagementComponent } from './Components/admin-interface/product-management/product-management.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'about',component:AboutPageComponent },
  {path:'contact', component:ContactPageComponent},
  {path:'user-registration', component:UserRegistrationPageComponent},
  {path:'user-address', component:UserAddressComponent},
  {path:'product-management', component:ProductManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
