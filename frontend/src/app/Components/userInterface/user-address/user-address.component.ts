import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { OrderService } from 'src/app/Services/order.service';
import { SessionUserModel } from 'src/app/shared/classes/SessionUserModel';
import { databaseAddress } from 'src/app/shared/interfaces/databaseAddress';
import { Router } from '@angular/router';
import { AddressModel } from 'src/app/shared/classes/AddressModel';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {
  toggle:boolean=false;
  isTokenValid:boolean=false;
  user!:SessionUserModel;
  selectedAddress:databaseAddress;

  constructor(private fb: FormBuilder,
    private loginService:LoginService,
    private orderService:OrderService,
    private router:Router) {
      this.loginService.tokenFromSessionStorage().subscribe((data: any) => {
        console.log(data);
        if (data.error) {
          this.isTokenValid = false;
        } else {
          this.isTokenValid = true;
        }
      });

      this.loginService.getUserObservable().subscribe((sessionUser) => {
        console.log('sessionUser :', sessionUser);
        this.user = sessionUser;
      });
     }

  addressDetailsForm = this.fb.group({
    address: ['', [Validators.required]],
    landmark: ['', [Validators.required]],
    state: ['', [Validators.required, Validators.minLength(3)]],
    city: ['', [Validators.required, Validators.minLength(3)]],
    pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
  });

  ngOnInit(): void {
  }

  checkFormErrors(dataObj: FormGroup) {
    let controlErrors: ValidationErrors = [];
    Object.keys(dataObj.controls || {}).forEach((key) => {
      if (typeof dataObj.get(key).value !== 'object') {
        console.log(dataObj.get(key).errors);
        if (dataObj.get(key).errors) {
          controlErrors.push(dataObj.get(key).errors);
        }
      } else if (typeof dataObj.get(key).value === 'object') {
        this.checkFormErrors(dataObj.get(key) as FormGroup);
      }
    });
    if (controlErrors.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  toggleDiv() {
    this.toggle = !this.toggle;
  }

  changeAddress(address: databaseAddress) {
    this.selectedAddress = address;
    console.log('address :', this.selectedAddress);
  }

  onSubmit(userId: string) {
    const updateAddress = {
      address: this.addressDetailsForm.get('address').value,
      landmark: this.addressDetailsForm.get('landmark').value,
      state: this.addressDetailsForm.get('state').value,
      city: this.addressDetailsForm.get('city').value,
      pincode: parseInt(this.addressDetailsForm.get('pincode').value),
    };

    this.user.addresses.push(updateAddress);
    this.loginService.updateUserAddress(userId, updateAddress);
    alert('Address added successfully');
    window.location.reload();

  }

  onProceedToPayment() {
    if (!this.selectedAddress) {
      alert('Please Select The Address To Proceed');
      return;
    } else {
      const userAddress = this.selectedAddress;
      this.orderService.proceedToPayment(userAddress);
      this.router.navigate(['/', 'payment-page']);
    }
  }

}
