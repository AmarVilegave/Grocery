import { Injectable } from '@angular/core';
import { UserModel } from '../shared/classes/UserModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  USER_URL,
  USER_BY_ID_URL,
  LOGIN_URL,
  ADMIN_URL,
  ADMIN_LOGIN_URL,
} from '../shared/constants/urls';
import { databaseAddress } from '../shared/interfaces/databaseAddress';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionUserModel } from '../shared/classes/SessionUserModel';
import { login } from '../shared/interfaces/login';
import { Router } from '@angular/router';
import { AdminModel } from '../shared/classes/AdminModel';
import { databaseAdmin } from '../shared/interfaces/databaseAdmin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user: SessionUserModel = this.getUserFromLocalStorage();
  userSubject: BehaviorSubject<SessionUserModel> = new BehaviorSubject(
    this.user
  );
  admin: databaseAdmin = this.getAdminFromLocalStorage();
  adminSubject: BehaviorSubject<databaseAdmin> = new BehaviorSubject(
    this.admin
  );
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(newUser: UserModel) {
    this.http
      .post<any>(USER_URL, newUser, { observe: 'response' })
      .subscribe((data) => {
        this.setJwtTokenTOSessionStorage(data);
        localStorage.setItem(
          'User',
          JSON.stringify({
            fullName: data.body.fullName,
            email: data.body.email,
            _id: data.body._id,
          })
        );
        this.setUserDataToLocalStorage(data);
      });
  }

  registerAdmin(newAdmin: databaseAdmin) {
    console.log('service admin :', newAdmin);
    this.http
      .post<AdminModel>(ADMIN_URL, newAdmin, { observe: 'response' })
      .subscribe((data) => {
        console.log(data);
      });
  }

  updateUserAddress(userId: string, updatedAddress: databaseAddress) {
    let sessionUser = this.getUserFromLocalStorage();
    if (userId === sessionUser._id && sessionUser.addresses.length >= 0) {
      sessionUser.addresses.push(updatedAddress);
      this.updateUserDataToLocalStorage(sessionUser);
    }
    this.http.put(USER_BY_ID_URL + userId, updatedAddress).subscribe((data) => {
      console.log(data);
    });
  }

  loginUser(userData: login): any {
    this.http.post<any>(LOGIN_URL, userData, { observe: 'response' }).subscribe(
      (data) => {
        this.setJwtTokenTOSessionStorage(data);
        this.setUserDataToLocalStorage(data);
      },
      (error) => {
        alert('Login failed check your email or password');
      }
    );
    return 0;
  }

  loginAdmin(userData: login) {
    this.http
      .post<any>(ADMIN_LOGIN_URL, userData, { observe: 'response' })
      .subscribe((data) => {
        this.setJwtTokenTOSessionStorage(data);
        this.setAdminDataToLocalStorage(data);
      },
      (error) => {
        alert('Login failed check your email or password');
      });
  }

  setJwtTokenTOSessionStorage(data: any) {
    sessionStorage.setItem(
      'token',
      JSON.stringify(data.headers.get('x-auth-token'))
    );
  }

  tokenFromSessionStorage(): any {
    const tokenJson = sessionStorage.getItem('token');
    let queryParams = new HttpParams().append('token', tokenJson);
    return this.http.get<any>(USER_URL + '/verifyToken', {
      params: queryParams,
    });
  }



  setUserDataToLocalStorage(data: any) {
    localStorage.setItem(
      'User',
      JSON.stringify({
        _id: data.body._id,
        fullName: data.body.fullName,
        email: data.body.email,
        mobileNo: data.body.mobileNo,
        addresses: data.body.addresses,
      })
    );
  }



  updateUserDataToLocalStorage(data: any) {
    localStorage.setItem(
      'User',
      JSON.stringify({
        _id: data._id,
        fullName: data.fullName,
        email: data.email,
        mobileNo: data.mobileNo,
        addresses: data.addresses,
      })
    );
  }

  setAdminDataToLocalStorage(data: any) {
    localStorage.setItem(
      'Admin',
      JSON.stringify({
        _id: data.body._id,
        fullName: data.body.fullName,
        email: data.body.email,
        mobileNo: data.body.mobileNo,
        role: data.body.role,
      })
    );
  }

  getUserFromLocalStorage() {
    const userJson = localStorage.getItem('User');
    return userJson ? JSON.parse(userJson) : new SessionUserModel();
  }

  getAdminFromLocalStorage() {
    const adminJson = localStorage.getItem('Admin');
    return adminJson ? JSON.parse(adminJson) : new AdminModel();
  }

  getUserObservable(): Observable<SessionUserModel> {
    return this.userSubject.asObservable();
  }

  getAdminObservable(): Observable<databaseAdmin> {
    return this.adminSubject.asObservable();
  }

  removeUserDataAndToken() {
    localStorage.removeItem('User');
    sessionStorage.removeItem('token');
  }

  removeAdminDataAndToken() {
    localStorage.removeItem('Admin');
    sessionStorage.removeItem('token');
  }
}
