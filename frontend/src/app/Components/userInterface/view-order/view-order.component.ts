import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { OrderModel } from 'src/app/shared/classes/OrderModel';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  order: OrderModel;

  constructor(private orderService:OrderService,
    private activatedRoute:ActivatedRoute,
    private orderDialog: MatDialogRef<ViewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data._id) {
        orderService.getOrderById(data._id).subscribe((order) => {
          this.order = order
        });
      }
     }

  ngOnInit(): void {
  }

  closeViewOrderDialog() {
    this.orderDialog.close();
  }

}
