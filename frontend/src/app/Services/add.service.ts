import { Injectable } from '@angular/core';
import { ProductItem } from '../shared/classes/ProductItem';
import { Product } from '../shared/classes/Product';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/classes/Cart';
import { ProductService } from './product.service';
@Injectable({
  providedIn: 'root'
})
export class AddService {
  products: Product[] = [];
  cart: Cart = this.addItemFromLocalStorage();
  cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor(private productService:ProductService) {
    let productsObservable: Observable<Product[]>;
    productsObservable = productService.getAll();

    productsObservable.subscribe((serverProduct) => {
      this.products = serverProduct;
    });

  }

  setProductToLocalStorage(): void {
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  getObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  addItemFromLocalStorage() {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart(this.products);
  }

  removeCartFromLocalStorage() {
    localStorage.removeItem('Cart');
  }

  onAdd(item: Product) {
    const cartItem = new ProductItem(item);
    this.cart.items.push(cartItem);
    this.cart.totalQuantity++;
    this.cart.totalPrice += item.price;
    this.setProductToLocalStorage();
    this.products.forEach((ele) => {
      if (ele._id === item._id) ele.quantity--;
    });
    console.log(this.products);
  }

  onPlus(id: string) {
    // if (quantity === 0) return;
    let product = this.products.find((ele) => ele._id === id);
    console.log(product);
    if (product?.quantity === 0) return;
    else {
      this.cart.items.forEach((ele) => {
        // console.log(ele);
        if (ele._id === id) {
          ele.quantity++;
          this.cart.totalQuantity++;
          this.cart.totalPrice += ele.price;
        }
      });
      this.setProductToLocalStorage();
      this.products.forEach((ele) => {
        if (ele._id === id) {
          ele.quantity--;
        }
      });
    }
  }

  onMinus(id: string) {
    let product = this.cart.items.find((ele) => ele._id === id);
    if (product?.quantity === 1) {
      this.cart.totalPrice -= product.price;
      this.cart.totalQuantity--;
      this.cart.items = this.cart.items.filter((item) => item._id !== id);
      this.products.forEach((ele) => {
        if (ele._id === id) {
          ele.quantity++;
        }
      });
      if (this.cart.items.length == 0) {
        this.cart.totalPrice = 0;
        this.cart.totalQuantity = 0;
      }
      this.setProductToLocalStorage();
      return;
    } else {
      this.cart.items.forEach((ele) => {
        if (ele._id === id) {
          this.cart.totalQuantity--;
          this.cart.totalPrice -= ele.price;
          ele.quantity--;
        }
      });
      this.setProductToLocalStorage();
      this.products.forEach((ele) => {
        if (ele._id === id) {
          ele.quantity++;
        }
      });
    }
  }

  onRemove(id: string, quantity: number) {
    let product = this.cart.items.find((ele) => ele._id === id);
    console.log('', product);
    if (!product) {
      this.cart.totalPrice = 0;
      this.cart.totalQuantity = 0;
      return;
    } else {
      this.cart.totalPrice -= product.price * product.quantity;
      this.cart.totalQuantity -= product.quantity;
      this.cart.items = this.cart.items.filter((ele) => ele._id !== id);
      this.products.forEach((ele) => {
        if (ele._id === id) {
          ele.quantity += quantity;
        }
      });
      if (this.cart.items.length == 0) {
        this.cart.totalPrice = 0;
        this.cart.totalQuantity = 0;
      }
    }
    this.setProductToLocalStorage();
  }

  productExist(id: string) {
    let product = this.cart.items.find((ele) => ele._id === id);
    if (product) return true;
    else return false;
  }

  productQuantity(id: string) {
    let product = this.cart.items.find((ele) => ele._id === id);
    if (product) return product.quantity;
    else return '';
  }


}
