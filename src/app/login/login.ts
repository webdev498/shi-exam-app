import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

import {LoginService} from './login.service';
import {LoginResponse} from './../model/LoginResponse';
import {UserTokenKey} from './../model/Constants';
import {UserInfoKey} from './../model/Constants';
import {User} from './../model/User';
import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'login',  
  providers: [
    LoginService
  ],
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  pipes: [ ],
  styles: [ require('./login.css') ],
  template: require('./login.html')
})
export class LoginComponent {
  // Set our default values
  username: string;
  password: string;
  submitted: boolean;
  errorMessage: string;
  jwt: JwtHelper = new JwtHelper();
  
  // TypeScript public modifiers
  constructor(private _loginService: LoginService) {
    this.errorMessage = '';
  }

  submitLogin() {
   this._loginService.postLogin(this.username, this.password)
    .subscribe(
      response => this._handleResponse(response),
      error => this._handleError(error)
    );
  }
  
  _handleResponse(lr) {
    localStorage[UserTokenKey] = JSON.stringify(lr.token);
    localStorage[UserInfoKey] = JSON.stringify(<User>this.jwt.decodeToken(lr.token));
    
    //Route to main screen
  }
  
  _handleError(e) {
    if (e.status === 401) {
      this.errorMessage = 'Login Failed';
    }
  }
  
  loginButtonState() {
      return this.password == null ||
        this.password.length < 8 || 
        this.username == null ||
        this.submitted;
  }
  
  facebook() {
      
  }
  
  google() {
      
  }
  
  ngOnInit() {

  }

}
