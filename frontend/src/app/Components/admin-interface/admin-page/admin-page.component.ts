import { ProductService } from 'src/app/Services/product.service';
import { LoginService } from 'src/app/Services/login.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/Product';
import { Observable } from 'rxjs';
import { SessionUserModel } from 'src/app/shared/classes/SessionUserModel';
import { databaseAdmin } from 'src/app/shared/interfaces/databaseAdmin';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  user!: SessionUserModel;
  admin!: databaseAdmin;
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private loginService: LoginService
  ) {
    let productsObservable: Observable<Product[]>;
    productsObservable = productService.getAll();
    productsObservable.subscribe((serverProduct) => {
      this.products = serverProduct;
    });

    this.loginService.getUserObservable().subscribe((sessionUser) => {
      this.user = sessionUser;
    });

    this.loginService.getAdminObservable().subscribe((sessionAdmin) => {
      this.admin = sessionAdmin;
    });

  }

  ngOnInit(): void {}
}
