import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {FORM_PROVIDERS} from '@angular/common';

import {Home} from './home/home';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgotpassword/forgotpassword.component';

import {AuthService} from './services/auth.service';

@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS, AuthService ],
  directives: [ ...ROUTER_DIRECTIVES ],
  pipes: [],
  template: require('./app.html')
})
@Routes([
  { path: '/', component: Home},
  { path: '/login', component: LoginComponent},
  { path: '/register', component: RegisterComponent},
  { path: '/forgotpassword', component: ForgotPasswordComponent}
])
export class App {
  url = 'http://www.commongroundinternational.com';
  currentYear = new Date().getFullYear();
  constructor(private _authService: AuthService) {
    
  }
}
