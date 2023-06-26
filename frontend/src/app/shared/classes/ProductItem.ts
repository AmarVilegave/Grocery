import { Product } from "./Product";

export class ProductItem {
  constructor(product: Product) {
    this._id = product._id;
    this.name = product.name;
    this.quantity = 1;
    this.image = product.image;
    this.price = product.price;
    this.category = product.category;
    this.weight = product.weight;
    this.description = product.description;
  }
  _id: string;
  name: string;
  quantity: number;
  image: string[];
  price: number;
  category: {
    _id: string;
    category: string;
    tag: string;
  };
  weight: string;
  description: string;
}
