import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Register} from './../register/register';
import {ForgotPassword} from './../forgotpassword/forgotpassword';

import {LoginService} from './login.service';
import {LoginResponse} from './../model/LoginResponse';
import {UserTokenKey} from './../model/Constants';
import {UserInfoKey} from './../model/Constants';
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
@RouteConfig([
  { path: '../register', component: Register, name: 'Register'},
  { path: '../forgotpassword', component: ForgotPassword, name: 'ForgotPassword'}
])
export class Login {
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
    localStorage[UserTokenKey] = JSON.stringify(lr);
    localStorage[UserInfoKey] = JSON.stringify(this.jwt.decodeToken(lr.token));
    
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
