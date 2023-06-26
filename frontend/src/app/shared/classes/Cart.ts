import { ProductItem } from "./ProductItem";

export class Cart {
  constructor(items: ProductItem[]) {
    this.items = items;
  }
  items: ProductItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
}
