import { Component, OnInit } from '@angular/core';
import { AddService } from 'src/app/Services/add.service';
import { ProductService } from 'src/app/Services/product.service';
import { LoginService } from 'src/app/Services/login.service';
import { OrderService } from 'src/app/Services/order.service';
import { Cart } from 'src/app/shared/classes/Cart';
import { Product } from 'src/app/shared/classes/Product';
import { SessionUserModel } from 'src/app/shared/classes/SessionUserModel';
import { databaseAdmin } from 'src/app/shared/interfaces/databaseAdmin';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!:Cart;
  user!:SessionUserModel;
  admin!:databaseAdmin;
  products:Product[]=[];
  isChecked:boolean=false;

  constructor(private addService:AddService,
    private productService:ProductService,
    private loginService:LoginService,
    private orderService:OrderService,
    private router:Router
    ) {
      let productsObservable: Observable<Product[]>;
    productsObservable = productService.getAll();
    productsObservable.subscribe((serverProduct) => {
      this.products = serverProduct;
    });

    this.addService
      .getObservable()
      .subscribe((product) => (this.cart = product));

      this.loginService
      .getUserObservable()
      .subscribe((sessionUser) => (this.user = sessionUser));

      this.loginService
      .getAdminObservable()
      .subscribe((sessionAdmin) => (this.admin = sessionAdmin));
    }

  ngOnInit(): void {
  }

  onPlus(id: string) {
    this.addService.onPlus(id);
  }

  onMinus(id: string) {
    this.addService.onMinus(id);
  }

  onRemove(id: string, quantity: number) {
    this.addService.onRemove(id, quantity);
  }

  prodQuantity(id: string) {
    return this.addService.productQuantity(id);
  }

  totalPrice(id: string, quantity: number) {
    let product = this.cart.items.find((ele) => ele._id === id);
    if (product) {
      product.quantity = quantity;
      return (product.price *= quantity);
    } else return '';
  }

  check(id: string) {
    let product = this.cart.items.find((ele) => ele._id === id);
    if (product) return true;
    return false;
  }

  placeOrder() {
    let cart = this.cart;
    let user = this.user;

    if (user.email) {
      this.orderService.placeOrder(cart, user);
      this.router.navigate(['/', 'address']);
    } else {
      this.router.navigate(['/', 'login']);
    }
  }

}
