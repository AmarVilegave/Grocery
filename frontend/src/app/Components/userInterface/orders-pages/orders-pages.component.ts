import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { OrderModel } from 'src/app/shared/classes/OrderModel';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrderComponent } from '../view-order/view-order.component';

@Component({
  selector: 'app-orders-pages',
  templateUrl: './orders-pages.component.html',
  styleUrls: ['./orders-pages.component.css']
})
export class OrdersPagesComponent implements OnInit {
  convenienceFee: number = 50;
  orders: OrderModel[] = [];


  constructor(private orderService:OrderService,
    private _viewOrderDialog: MatDialog
    ) {
    let ordersObservable: Observable<OrderModel[]>;
    ordersObservable = this.orderService.getAllOrders();

    ordersObservable.subscribe((serverOrders) => {
      this.orders = serverOrders;
      console.log('server orders :', this.orders);
    });
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

    orderDialog.afterClosed().subscribe((response) => {
      console.log('Closed', response);
    });
  }

}
