import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {FORM_PROVIDERS} from '@angular/common';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterStartComponent} from './register/registerstart.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgotpassword/forgotpassword.component';
import {ExamStartComponent} from './exam/examstart.component';

import {AuthService} from './services/auth.service';

@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS, AuthService ],
  directives: [ ...ROUTER_DIRECTIVES ],
  pipes: [],
  template: require('./app.html'),
  styles: [ require('./app.less') ]
})
@Routes([
  { path: '/', component: HomeComponent},
  { path: '/login', component: LoginComponent},
  { path: './registerstart', component: RegisterStartComponent},
  { path: '/register', component: RegisterComponent},
  { path: '/forgotpassword', component: ForgotPasswordComponent},
  { path: '/examstart', component: ExamStartComponent}
])
export class App {
  url = 'http://www.commongroundinternational.com';
  currentYear = new Date().getFullYear();
  constructor(private _authService: AuthService) {
    
  }
}
