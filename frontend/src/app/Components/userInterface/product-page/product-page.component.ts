import { Component, OnInit } from '@angular/core';
import { AddService } from 'src/app/Services/add.service';
import { ProductService } from 'src/app/Services/product.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/classes/Product';
import { Cart } from 'src/app/shared/classes/Cart';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  cart!: Cart;
  item: Product = new Product();
  products: Product[] = [];
  selectedCategory: string;
  selectedTag: string;

  constructor(private addService:AddService,
     private productService:ProductService,
     private activatedRoute:ActivatedRoute,
     private router:Router) {
      let productsObservable: Observable<Product[]>;
    productsObservable = productService.getAll();
    productsObservable.subscribe((serverProduct) => {
      this.products = serverProduct;
    });

    let selectedCategoryObservable: Observable<string>;
    selectedCategoryObservable =
      this.productService.getSelectedCategoryObservable();
    selectedCategoryObservable.subscribe((serviceCategory) => {
      this.selectedCategory = serviceCategory;
    });

    activatedRoute.params.subscribe((params) => {
      if (params.id)
        productService.getProductById(params.id).subscribe((product) => {
          this.item = product;
        });
    });

    this.addService
      .getObservable()
      .subscribe((product) => (this.cart = product));
     }

  ngOnInit(): void {
  }

  onClick(product: Product) {
    this.addService.onAdd(product);
    this.products.forEach((ele) => {
      if (ele._id === product._id) ele.quantity--;
    });
  }

  onMinus(id: string, quantity: number) {
    this.addService.onMinus(id);
  }

  onPlus(id: string) {
    this.addService.onPlus(id);
  }

  productQuantity(id: string) {
    let product = this.cart.items.find((ele) => ele._id === id);
    if (product) return product.quantity;
    else return '';
  }

  productExist(id: string) {
    let product = this.cart.items.find((ele) => ele._id === id);
    if (product) return true;
    else return false;
  }

  selectCategoryAndTag(category: string, tag: string) {
    this.productService.selectNewCategory(category);
    this.productService.setNewTag(tag);
  }

  selectActiveCategoryAndTag(category: string, tag: string) {
    this.selectedCategory = category;
    this.selectedTag = tag;

    if (this.selectedTag && this.selectedCategory) {
      this.selectCategoryAndTag(this.selectedCategory, this.selectedTag);
      return true;
    } else return false;
  }
}
