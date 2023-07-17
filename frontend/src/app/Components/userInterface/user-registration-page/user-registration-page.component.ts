import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrls: ['./user-registration-page.component.css']
})
export class UserRegistrationPageComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private loginService:LoginService,
    private router:Router) { }

  registrationDetailsForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [
        Validators.pattern(
          '^[a-z][a-zA-Z0-9-._]+@([a-zA-Z]{3,})+.+[a-zA-Z.]{2,}$'
        ),
        Validators.required,
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    mobileNo: [
      '',
      [Validators.required, Validators.pattern('^[7-9][0-9]{9}$')],
    ],
    dateOfBirth: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  registerUser() {
    const newUser = {
      fullName: this.registrationDetailsForm.get('fullName').value,
      email: this.registrationDetailsForm.get('email').value,
      password: this.registrationDetailsForm.get('password').value,
      mobileNo: parseInt(this.registrationDetailsForm.get('mobileNo').value),
      dateOfBirth: this.registrationDetailsForm.get('dateOfBirth').value,
      isAdmin: false,
    };
    this.loginService.registerUser(newUser);
    this.defaultFormValues();
    alert('User Registered Successfully');
    this.router.navigate(['/', 'user-address']);
  }

  defaultFormValues() {
    this.registrationDetailsForm.setValue({
      fullName: null,
      email: null,
      password: null,
      confirmPassword: null,
      mobileNo: null,
      dateOfBirth: null,
    });
  }

  checkFormErrors(dataObj: FormGroup) {
    let password = this.registrationDetailsForm.get('password').value;
    let confirmPassword =
      this.registrationDetailsForm.get('confirmPassword').value;
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
    } else if (password !== confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

}
