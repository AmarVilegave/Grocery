import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { OrderModel } from 'src/app/shared/classes/OrderModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders-pages',
  templateUrl: './orders-pages.component.html',
  styleUrls: ['./orders-pages.component.css']
})
export class OrdersPagesComponent implements OnInit {
  convenienceFee: number = 50;
  orders: OrderModel[] = [];


  constructor(private orderService:OrderService) {
    let ordersObservable: Observable<OrderModel[]>;
    ordersObservable = this.orderService.getAllOrders();

    ordersObservable.subscribe((serverOrders) => {
      this.orders = serverOrders;
      console.log('server orders :', this.orders);
    });
  }

  ngOnInit(): void {
  }

}
