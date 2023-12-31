import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { databaseAdmin } from 'src/app/shared/interfaces/databaseAdmin';
@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {
  roles: string[] = ['admin', 'super admin', 'moderator'];
  admin!:databaseAdmin;

  constructor(private fb:FormBuilder, private loginService:LoginService) {
    this.loginService.getAdminObservable().subscribe((sessionAdmin) => {
      this.admin = sessionAdmin;
    });
  }

  adminRegistrationForm = this.fb.group({
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
    role: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  checkFormErrors(dataObj: FormGroup) {
    let password = this.adminRegistrationForm.get('password').value;
    let confirmPassword =
      this.adminRegistrationForm.get('confirmPassword').value;

    let controlErrors: ValidationErrors = [];
    Object.keys(dataObj.controls || {}).forEach((key) => {
      if (typeof dataObj.get(key).value !== 'object') {
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

  registerAdmin() {
    const newAdmin = {
      fullName: this.adminRegistrationForm.get('fullName').value,
      email: this.adminRegistrationForm.get('email').value,
      password: this.adminRegistrationForm.get('password').value,
      mobileNo: parseInt(this.adminRegistrationForm.get('mobileNo').value),
      role: this.adminRegistrationForm.get('role').value,
    };
    this.loginService.registerAdmin(newAdmin);
  }



  confirmPassword() {
    let password = this.adminRegistrationForm.get('password').value;
    let confirmPassword =
      this.adminRegistrationForm.get('confirmPassword').value;

    if (!password || confirmPassword === password) return true;
    else return false;
  }

}
