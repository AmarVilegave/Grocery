import { Cart } from "./Cart";
import { AddressModel } from "./AddressModel";

export class OrderModel {
  constructor() {}
  _id: string = '';
  cart: Cart;
   user = {
    fullName: '',
    email: '',
    mobileNo: 0,
    addresses: new AddressModel(),
  };
  paymentMode: string;
}
