/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {Login} from './login/login';
import {Register} from './register/register';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: Home, name: 'Index' },
  { path: '/login/...', component: Login, name: 'Login'},
  { path: '/register/...', component: Register, name: 'Register'},
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  url = 'http://www.commongroundinternational.com';
  currentYear = new Date().getFullYear();
  constructor() {

  }
}
