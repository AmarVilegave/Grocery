import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, flatMap } from 'rxjs';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  productDetailsForm = this.fb.group({
    productName: ['', [Validators.required]],
    categoryObject: this.fb.group({
      category: ['', [Validators.required]],
      tag: ['', Validators.required],
    }),
    price: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    quantity: ['', [Validators.required, Validators.pattern('^[0-9]{2}$')]],
    image: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  checkFormErrors(dataObj: FormGroup) {
    let controlErrors: ValidationErrors = [];
    Object.keys(dataObj.controls || {}).forEach((key) => {
      if (typeof dataObj.get(key).value !== 'object') {
        // console.log(dataObj.get(key).errors);
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

}
