import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { OrderModel } from 'src/app/shared/classes/OrderModel';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrderComponent } from '../view-order/view-order.component';
import { SessionUserModel } from 'src/app/shared/classes/SessionUserModel';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-orders-pages',
  templateUrl: './orders-pages.component.html',
  styleUrls: ['./orders-pages.component.css']
})
export class OrdersPagesComponent implements OnInit {
  convenienceFee: number = 50;
  orders: OrderModel[] = [];
  userOrders:OrderModel[]=[];
  user!:SessionUserModel;


  constructor(private orderService:OrderService,
    private loginService:LoginService,
    private _viewOrderDialog: MatDialog
    ) {
      this.loginService.getUserObservable().subscribe((sessionUser) => {
        this.user = sessionUser;
  });

    let ordersObservable: Observable<OrderModel[]>;

    ordersObservable = this.orderService.getOrderByEmail(this.user.email);
    ordersObservable.subscribe((serverOrders) => {
      this.orders = serverOrders
    })

  }

  ngOnInit(): void {
  }

  viewId(orderId: string) {
    console.log('orderId :', orderId);
  }

  viewOrderDetails(orderID: string) {
    const orderDialog = this._viewOrderDialog.open(ViewOrderComponent, {
      data: {
        _id: orderID,
      },
    });

    orderDialog.afterClosed().subscribe((response) => {});
  }

  getUserOrders() {
    this.userOrders = this.orders.filter((value) => {
      value.user.email === this.user.email
    })
  }

}
