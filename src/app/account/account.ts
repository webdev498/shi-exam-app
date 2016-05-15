import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import { UserInfoKey } from "./../../Constants";
import { User } from "./../model/User"

@Component({
  selector: 'account', 

  providers: [
    
  ],

  pipes: [ ],

  styles: [ require('./account.css') ],

  template: require('./account.html')
})
export class Account {
  // Set our default values
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  user: User;
  // TypeScript public modifiers
  constructor() {

  }
  
  ngOnInit() {
      this.user = <User>JSON.parse(localStorage[UserInfoKey]);
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
  }

}
