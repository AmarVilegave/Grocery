import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/Product';
import { ProductService } from 'src/app/Services/product.service';
import { AdminService } from 'src/app/Services/admin.service';
import { LoginService } from 'src/app/Services/login.service';
import { Observable } from 'rxjs';
import { databaseAdmin } from 'src/app/shared/interfaces/databaseAdmin';

@Component({
  selector: 'app-admin-products-page',
  templateUrl: './admin-products-page.component.html',
  styleUrls: ['./admin-products-page.component.css'],
})
export class AdminProductsPageComponent implements OnInit {
  products: Product[] = [];
  productsFilter: Product[] = [];
  searchTerm: string = '';
  admin!:databaseAdmin;
  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private loginService : LoginService
  ) {
    let productsObservable: Observable<Product[]>;
    productsObservable = this.productService.getAll();
    productsObservable.subscribe((serverProducts) => {
      this.products = serverProducts;
      this.productsFilter = this.products;
    });

    this.loginService.getAdminObservable().subscribe((sessionAdmin) => {
      this.admin = sessionAdmin;
    });

 }

  searchProducts(term: string) {
    if (term) {
      this.productsFilter = this.products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      this.productsFilter = this.products;
    }
  }

  removeProduct(productId: string) {
    this.adminService.removeProduct(productId);
    alert('Product Removed Successfully');
    window.location.reload();
  }

  ngOnInit(): void {}
}
