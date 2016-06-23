import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

import {LoginService} from './login.service';
import {UserService} from './../services/user.service';
import {AuthService} from './../services/auth.service';
import {LoginResponse} from './../model/LoginResponse';
import {UserTokenKey} from './../model/Constants';
import {UserInfoKey} from './../model/Constants';
import {User} from './../model/User';

@Component({
  providers: [
    LoginService, UserService, AuthService
  ],
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  pipes: [ ],
  styles: [ require('./login.less'), require('./../app.less') ] ,
  template: require('./login.html')
})
export class LoginComponent implements OnInit {
  // Set our default values
  username: string;
  password: string;
  submitted: boolean;
  errorMessage: string;
  processing: boolean = false;
  
  // TypeScript public modifiers
  constructor(private _loginService: LoginService,
              private _userService: UserService,
              private _authService: AuthService) {
    this.errorMessage = '';
  }

  submitLogin() {
   this.processing = true;
    
   this._loginService.postLogin(this.username, this.password)
    .subscribe(
      response => this._handleLoginResponse(response),
      error => this._handleError(error)
    );
  }
  
  _handleLoginResponse(lr: LoginResponse) {
    this._authService.saveToken(lr.token);
    
    this._userService.getUser(this._authService.tokenUserInfo().id)
      .subscribe(
          response => this._handleUserResponse(response),
          error => this._handleError(error)
      );
  }
  
  _handleUserResponse(user) {
    this.processing = false;
    
    this._authService.saveUser(user);   
        //TODO: Route to main screen
  }
  
  _handleError(e) {
    if (e.status === 401) {
      this.errorMessage = 'Login Failed';
      this.processing = false;
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
