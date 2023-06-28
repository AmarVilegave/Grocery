import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/Product';
import { ProductService } from 'src/app/Services/product.service';
import { AdminService } from 'src/app/Services/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products-page',
  templateUrl: './admin-products-page.component.html',
  styleUrls: ['./admin-products-page.component.css'],
})
export class AdminProductsPageComponent implements OnInit {
  products: Product[] = [];
  productsFilter: Product[] = [];
  searchTerm: string = '';
  constructor(
    private productService: ProductService,
    private adminService: AdminService,
  ) {
    let productsObservable: Observable<Product[]>;
    productsObservable = this.productService.getAll();
    productsObservable.subscribe((serverProducts) => {
      this.products = serverProducts;
      this.productsFilter = this.products;
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
  }

  ngOnInit(): void {}
}
