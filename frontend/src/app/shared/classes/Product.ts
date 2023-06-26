import { Category } from "./Category";

export class Product {
  _id: string = null;
  name: string = null;
  category: Category = new Category();
  price: number = null;
  weight: string = null;
  quantity: number = null;
  image: string[] = null;
  description: string = null;
}
