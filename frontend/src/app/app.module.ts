import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/userInterface/home/home.component';
import { AboutPageComponent } from './Components/userInterface/about-page/about-page.component';
import { ContactPageComponent } from './Components/userInterface/contact-page/contact-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutPageComponent,
    ContactPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
