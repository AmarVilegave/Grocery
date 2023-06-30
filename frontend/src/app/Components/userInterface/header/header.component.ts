import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import { SessionUserModel } from 'src/app/shared/classes/SessionUserModel';
import { Cart } from 'src/app/shared/classes/Cart';
import { databaseAdmin } from 'src/app/shared/interfaces/databaseAdmin';
import { Router } from '@angular/router';
import { AddService } from 'src/app/Services/add.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!:SessionUserModel;
  admin!:databaseAdmin;
  isTokenValid:boolean=false;
  cart!:Cart;


  constructor(private loginService:LoginService, private router:Router, private addService:AddService) {
    this.loginService.tokenFromSessionStorage().subscribe((data: any) => {
      if (data.error) {
        this.isTokenValid = false;
      } else {
        this.isTokenValid = true;
      }
    });

    this.loginService.getUserObservable().subscribe((sessionUser) => {
          this.user = sessionUser;
    });

    this.loginService.getAdminObservable().subscribe((sessionAdmin) => {
      this.admin = sessionAdmin;
    });

    this.addService
      .getObservable()
      .subscribe((product) => (this.cart = product));

   }

  ngOnInit(): void {
  }

  removeUserDataAndToken() {
    console.log('admin :', this.admin);
    console.log('user', this.user);
    if (this.user) {
      this.loginService.removeUserDataAndToken();
      this.addService.removeCartFromLocalStorage();
      setTimeout(() => {
        this.loginService.tokenFromSessionStorage().subscribe((data: any) => {
          if (data.error) {
            this.router.navigate(['/', 'home']).then(() => {
              window.location.reload();
            });
          }
        });
      }, 1000);
    }
    if (this.admin) {
      this.loginService.removeAdminDataAndToken();
    }

    console.log('logged out admin :', this.admin);
    console.log('logged out user', this.user);
    // window.location.reload();
  }




}
