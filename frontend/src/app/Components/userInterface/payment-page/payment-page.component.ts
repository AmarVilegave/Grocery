import { Component, OnInit } from '@angular/core';
import { AddService } from 'src/app/Services/add.service';
import { LoginService } from 'src/app/Services/login.service';
import { OrderService } from 'src/app/Services/order.service';
import { Cart } from 'src/app/shared/classes/Cart';
import { SessionUserModel } from 'src/app/shared/classes/SessionUserModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  isPaymentSuccessful: boolean = false;
  selectedPaymentMode: string;
  convenienceFee: number = 50;
  user!: SessionUserModel;
  cart!: Cart;
  paymentDetails = [
    {
      paymentMode: 'Net Banking',
      img: '../../../assets/paymentOption/net-banking.png',
    },
    {
      paymentMode: 'Credit Card',
      img: '../../../assets/paymentOption/credit-card.png',
    },
    {
      paymentMode: 'Debit Card/ATM',
      img: '../../../assets/paymentOption/debit-card.png',
    },
    {
      paymentMode: 'Cash on Delivery',
      img: '../../../assets/paymentOption/cash-on-delivery.png',
    },
  ];

  constructor(private addService:AddService,
    private loginService:LoginService,
    private orderService:OrderService,
    private router:Router) {
      this.addService
      .getObservable()
      .subscribe((product) => (this.cart = product));

      this.loginService.getUserObservable().subscribe((sessionUser) => {
        this.user = sessionUser;
      });
    }



  ngOnInit(): void {
  }

  onChangePaymentMode(event: any) {
    this.selectedPaymentMode = event.target.value;
  }

  onConfirmOrder() {
    if (!this.selectedPaymentMode) {
      alert('Please Select Payment Option To Proceed');
      return;
    } else {
      const paymentMode = this.selectedPaymentMode;
      this.orderService.confirmOrder(paymentMode);
      this.isPaymentSuccessful = !this.isPaymentSuccessful;
      this.addService.removeCartFromLocalStorage();
      setTimeout(() => {
        this.loginService.tokenFromSessionStorage().subscribe((data: any) => {
          if (!data.error) {
            this.router.navigate(['/', 'home']).then(() => {
              window.location.reload();
            });
          }
        });
      }, 2000);
    }
  }

}
