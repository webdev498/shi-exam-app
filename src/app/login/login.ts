import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {LoginService} from './login.service';
import {LoginResponse} from './../model/LoginResponse';
import {UserTokenKey} from './../model/Constants';
import {UserInfoKey} from './../model/Constants';
import {jwtDecode} from 'jwt-Decode';

@Component({
  selector: 'login',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    LoginService
  ],

  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./login.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./login.html')
})
export class Login {
  // Set our default values
  username: string;
  password: string;
  submitted: boolean;
  errorMessage: string;
  // TypeScript public modifiers
  constructor(private _loginService: LoginService) {
    this.errorMessage = '';
  }

  submitLogin() {
   this._loginService.postLogin(this.username, this.password)
    .subscribe(
      response => this._handleResponse(response),
      error => this._handleError(error)
    )
  }
  
  _handleResponse(lr) {
    localStorage[UserTokenKey] = JSON.stringify(lr);
    localStorage[UserInfoKey] = JSON.stringify(jwtDecode(lr.token));
    
    //Route to main screen
  }
  
  _handleError(e) {
    if (e.status == 401) {
      this.errorMessage = "Login Failed";
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
