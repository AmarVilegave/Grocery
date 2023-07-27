import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../shared/classes/Product';
import { SessionUserModel } from '../shared/classes/SessionUserModel';
import { ProductService } from './product.service';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { USER_WISHLIST_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  products: Product[] = [];
  user!: SessionUserModel;
  wishlist!: Product[];
  favoriteSubject: BehaviorSubject<Product[]> = new BehaviorSubject(
    this.wishlist
  );

  constructor(private http:HttpClient, private productService:ProductService, private loginService:LoginService) {

    let productsObservable: Observable<Product[]>;
    productsObservable = this.productService.getAll();
    productsObservable.subscribe((serverProduct) => {
      this.products = serverProduct;
    });

    this.loginService.getUserObservable().subscribe((sessionUser) => {
      this.user = sessionUser;
    });

    if (this.user._id) {
      let wishlistObservable: Observable<Product[]>;
      wishlistObservable = this.getUserWishlist();
      wishlistObservable.subscribe((serverWishlist) => {
        this.wishlist = serverWishlist;
      });
    }
  }

  getUserWishlist() {
    let userId = this.user._id;
    return this.http.get<any[]>(USER_WISHLIST_URL + userId);
  }

  getObservable(): Observable<Product[]> {
    return this.favoriteSubject.asObservable();
  }

  toggleFavorite(id: string) {
    if (this.wishlist) {
      let product = this.wishlist.find((ele) => ele._id === id);
      if (product) return true;
      else return false;
    }
    return false;
  }

  toggleBorder(category: unknown) {
    let product = this.products.find(
      (ele) => ele.category.category === category
    );
    if (product) return true;
    else return false;
  }

  onAddAndRemoveFavorite(item: Product) {
    let wishlistProduct = {
      _id: item._id,
      name: item.name,
      category: item.category,
      price: item.price,
      weight: item.weight,
      quantity: item.quantity,
      image: item.image,
      description: item.description,
    };
    let userId = this.user._id;
    let favoriteProductExists = this.wishlist.find(
      (ele) => ele._id === item._id
    );
    if (!favoriteProductExists) {
      this.wishlist.push(item);
      this.http
        .put(USER_WISHLIST_URL + userId, wishlistProduct)
        .subscribe((data) => {});
    } else {
      this.wishlist = this.wishlist.filter((ele) => ele._id !== item._id);
      this.http
        .put(USER_WISHLIST_URL + userId, wishlistProduct)
        .subscribe((data) => {});
    }
  }
}
