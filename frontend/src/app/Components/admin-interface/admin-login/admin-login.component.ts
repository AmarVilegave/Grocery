import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionUserModel } from 'src/app/shared/classes/SessionUserModel';
import { LoginService } from 'src/app/Services/login.service';




@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  user!: SessionUserModel;

  constructor(private fb: FormBuilder, private loginService:LoginService, private router:Router) {
    this.loginService.getUserObservable().subscribe((sessionUser) => {
      this.user = sessionUser;
    });
  }

    adminLoginDetailsForm = this.fb.group({
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

  loginAdmin() {
    const adminData = {
      email: this.adminLoginDetailsForm.get('email').value,
      password: this.adminLoginDetailsForm.get('password').value,
    };

    this.loginService.loginAdmin(adminData);
    setTimeout(() => {
      this.loginService.tokenFromSessionStorage().subscribe((data: any) => {
        if (!data.error) {
          this.router.navigate(['/', 'admin']).then(() => {
            window.location.reload();
          });
        }
      });
    }, 1000);
  }

}
