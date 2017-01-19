import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'ng2-ui-auth';
import {Response} from '@angular/http';

import {LoginService} from './login.service';
import {UserService} from './../services/user.service';
import {AuthService as CGIAuth} from './../services/auth.service';
import {AnalyticsService} from './../services/analytics.service';
import {LoginResponse} from './../model/LoginResponse';
import {UserTokenKey} from './../model/Constants';
import {UserInfoKey} from './../model/Constants';
import {User} from './../model/User';

@Component({
  providers: [
    LoginService, UserService, CGIAuth, AuthService
  ],
  styles: [ require('./login.less') ],
  template: require('./login.html')
})
export class LoginComponent implements OnInit {
  // Set our default values
  username: string;
  password: string;
  errorMessage: string;
  processing: boolean = false;
  
  constructor(private _loginService: LoginService,
              private _userService: UserService,
              private _authService: CGIAuth,
              private _router: Router,
              private _oauth: AuthService,
              private _analytics: AnalyticsService) {
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

  formKeyup(e) {
    //submit on enter keyCode 
    if (e.keyCode === 13)
      this.submitLogin();
  }
  
  _handleLoginResponse(lr: LoginResponse) {
    this._authService.saveToken(lr);
    
    this._userService.getUser(this._authService.tokenUserInfo().id)
      .subscribe(
          response => this._handleUserResponse(response),
          error => this._handleError(error)
      );
  }
  
  _handleUserResponse(user) {
    this.processing = false;  
    this._authService.saveUser(user);   
    this._router.navigate(['examstart']);
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
        this.processing;
  }
  
  facebook() {
     this._oauthAuthenticate('facebook');
  }
  
  google() {
      this._oauthAuthenticate('google');
  }

  _oauthAuthenticate(provider: string) {
      let context = this;
      this._oauth.authenticate(provider)
          .subscribe(
                  (response: Response) => context._handleLoginResponse(response.json()),
                  (error: any) => console.log(`Error through handler: ${error.toString()}`)
               )
  }
  
  ngOnInit() {
    this._analytics.pageView('/login.html');
  }

}
