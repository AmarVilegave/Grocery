import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { SessionUserModel } from 'src/app/shared/classes/SessionUserModel';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user!:SessionUserModel;

  constructor(    private fb: FormBuilder, private loginService:LoginService, private router:Router) {
      this.loginService.getUserObservable().subscribe((sessionUser) => {
        this.user = sessionUser;})
    }

    loginDetailsForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-z][a-zA-Z0-9-._]+@([a-zA-Z]{3,})+.+[a-zA-Z.]{2,}$'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  ngOnInit(): void {
  }

  loginUser() {
    const userData = {
      email: this.loginDetailsForm.get('email').value,
      password: this.loginDetailsForm.get('password').value,
    };
    this.loginService.loginUser(userData);
    setTimeout(() => {
      this.loginService.tokenFromSessionStorage().subscribe((data: any) => {
        if (!data.error) {
          this.router.navigate(['/', 'home']).then(() => {
            window.location.reload();
          });
        }
      });
    }, 1000);
  }

}
