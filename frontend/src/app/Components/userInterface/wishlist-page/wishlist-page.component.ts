import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { AddService } from 'src/app/Services/add.service';
import { Product } from 'src/app/shared/classes/Product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent implements OnInit {
  wishlist:Product[]=[];

  constructor(private wishlistService:WishlistService, private addService:AddService) {
    let wishlistObservable: Observable<Product[]>;
    wishlistObservable = this.wishlistService.getUserWishlist();
    wishlistObservable.subscribe((serverWishlist) => {
      this.wishlist = serverWishlist;

    });
  }

  ngOnInit(): void {
  }

  productQuantity(id: string) {
    return this.addService.productQuantity(id);
  }

  productExist(id: string) {
    return this.addService.productExist(id);
  }

  toggleFavorite(id: string) {
    return this.wishlistService.toggleFavorite(id);
  }

  onAddAndRemoveFavorite(product: Product) {
    this.wishlistService.onAddAndRemoveFavorite(product);
    window.location.reload();
  }

  onClick(product: Product) {
    this.addService.onAdd(product);
  }

  onMinus(id: string) {
    this.addService.onMinus(id);
  }

  onPlus(id: string) {
    this.addService.onPlus(id);
  }

}
