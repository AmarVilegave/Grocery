import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/shared/classes/Product';
import { AddService } from 'src/app/Services/add.service';
import { Cart } from 'src/app/shared/classes/Cart';
import { SessionUserModel } from 'src/app/shared/classes/SessionUserModel';
import { LoginService } from 'src/app/Services/login.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  products: Product[] = [];
  mainProducts: Product[] = [];
  categories = new Set();
  selectedCategory: string = '';
  cart!: Cart;
  user!: SessionUserModel;





  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private addService:AddService,
    private loginService:LoginService

    ) {
      let productsObservable: Observable<Product[]>;
    productsObservable = productService.getAll();
    productsObservable.subscribe((serverProduct) => {
      console.log(serverProduct);
      this.products = serverProduct;
      this.mainProducts = serverProduct;
      activatedRoute.params.subscribe((params) => {
        console.log('params', params);

        if (params.tag) {
          this.products = this.mainProducts.filter(
            (value) => value.category.tag === params.tag
          );
          this.fetchCategoriesOfProducts();
          if (params.category) {
            this.filterCategories(params.category);
          }
        }
      });
    });

    this.loginService.getUserObservable().subscribe((sessionUser) => {
      this.user = sessionUser;
    });
    }

  ngOnInit(): void {
  }

  fetchCategoriesOfProducts() {
    let filteredCategories = new Set();
    this.products.forEach((product) => {
      filteredCategories.add(product.category.category);
    });
    this.categories = filteredCategories;
    this.selectedCategory = '';
  }

  filterCategories(category: unknown) {
    this.products = this.mainProducts.filter(
      (product) => product.category.category === category
    );
    this.selectedCategory = category as string;
  }

  toggleBorder(category: unknown) {
    if (category == this.selectedCategory) {
      return true;
    }
    return false;
  }

  productExist(id: string) {
    return this.addService.productExist(id);
  }

  onClick(product: Product) {
    this.addService.onAdd(product);
  }

   onMinus(id: string, quantity: number) {
    this.addService.onMinus(id);
  }

   onPlus(id: string) {
    this.addService.onPlus(id);
  }

   prodQuantity(id: string) {
    return this.addService.productQuantity(id);
  }

}
