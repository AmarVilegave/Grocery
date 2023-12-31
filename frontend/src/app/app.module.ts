import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/userInterface/home/home.component';
import { AboutPageComponent } from './Components/userInterface/about-page/about-page.component';
import { ContactPageComponent } from './Components/userInterface/contact-page/contact-page.component';
import { UserRegistrationPageComponent } from './Components/userInterface/user-registration-page/user-registration-page.component';
import { UserAddressComponent } from './Components/userInterface/user-address/user-address.component';
import { ProductManagementComponent } from './Components/admin-interface/product-management/product-management.component';
import { AdminRegistrationComponent } from './Components/admin-interface/admin-registration/admin-registration.component';
import { CategoryManagementComponent } from './Components/admin-interface/category-management/category-management.component';
import { FooterComponent } from './Components/userInterface/footer/footer.component';
import { HeaderComponent } from './Components/userInterface/header/header.component';
import { CardComponent } from './Components/userInterface/card/card.component';
import { TagsComponent } from './Components/userInterface/tags/tags.component';
import { UserLoginComponent } from './Components/userInterface/user-login/user-login.component';
import { AdminLoginComponent } from './Components/admin-interface/admin-login/admin-login.component';
import { AdminCategoriesPageComponent } from './Components/admin-interface/admin-categories-page/admin-categories-page.component';
import { AdminProductsPageComponent } from './Components/admin-interface/admin-products-page/admin-products-page.component';
import { AdminPageComponent } from './Components/admin-interface/admin-page/admin-page.component';
import { WishlistPageComponent } from './Components/userInterface/wishlist-page/wishlist-page.component';
import { ProductPageComponent } from './Components/userInterface/product-page/product-page.component';
import { CartPageComponent } from './Components/userInterface/cart-page/cart-page.component';
import { PaymentPageComponent } from './Components/userInterface/payment-page/payment-page.component';
import { OrdersPagesComponent } from './Components/userInterface/orders-pages/orders-pages.component';
import { ViewOrderComponent } from './Components/userInterface/view-order/view-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutPageComponent,
    ContactPageComponent,
    UserRegistrationPageComponent,
    UserAddressComponent,
    ProductManagementComponent,
    AdminRegistrationComponent,
    CategoryManagementComponent,
    FooterComponent,
    HeaderComponent,
    CardComponent,
    TagsComponent,
    UserLoginComponent,
    AdminLoginComponent,
    AdminCategoriesPageComponent,
    AdminProductsPageComponent,
    AdminPageComponent,
    WishlistPageComponent,
    ProductPageComponent,
    CartPageComponent,
    PaymentPageComponent,
    OrdersPagesComponent,
    ViewOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
