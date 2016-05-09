import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {LoginService} from './login.service';

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
  username: String;
  password: String;
  submitted: Boolean;
  // TypeScript public modifiers
  constructor() {

  }

  submitLogin() {
    console.log(this.username);
    console.log(this.password);    
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
