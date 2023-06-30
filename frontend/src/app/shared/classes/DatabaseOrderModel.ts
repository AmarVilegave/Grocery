import { Cart } from "./Cart";
import { AddressModel } from "./AddressModel";

export class DatabaseOrderModel {
  constructor() {}
  cart: Cart;
   user = {
    fullName: '',
    email: '',
    mobileNo: 0,
    addresses: new AddressModel(),
  };
  paymentMode: string;
}
