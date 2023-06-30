import { Injectable } from '@angular/core';
import { OrderModel } from '../shared/classes/OrderModel';
import { DatabaseOrderModel } from '../shared/classes/DatabaseOrderModel';
import { Cart } from '../shared/classes/Cart';
import { SessionUserModel } from '../shared/classes/SessionUserModel';
import { databaseAddress } from '../shared/interfaces/databaseAddress';
import { HttpClient } from '@angular/common/http';
import { ORDER_BY_ID_URL, ORDER_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order: DatabaseOrderModel = new DatabaseOrderModel();


  constructor(private http:HttpClient) { }

  getAllOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(ORDER_URL);
  }

  getOrderById(orderId: string) {
    return this.http.get<OrderModel>(ORDER_BY_ID_URL + orderId);
  }

  placeOrder(cart: Cart, user: SessionUserModel) {
    this.order.cart = cart;
    this.order.user.fullName = user.fullName;
    this.order.user.email = user.email;
    this.order.user.mobileNo = user.mobileNo;
  }

  proceedToPayment(address: databaseAddress) {
    this.order.user.addresses = address;
    console.log(this.order.user.addresses);
  }

  confirmOrder(paymentMode: string) {
    this.order.paymentMode = paymentMode;
    let newOrder = this.order;
    this.http.post<OrderModel>(ORDER_URL, newOrder).subscribe((data) => {
    });
  }
}
