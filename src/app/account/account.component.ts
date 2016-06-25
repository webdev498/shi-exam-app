import {Component} from '@angular/core';
import { UserInfoKey } from "./../model/Constants";
import { User } from "./../model/User"

@Component({
  selector: 'account', 

  providers: [
    
  ],

  pipes: [ ],

  styles: [ require('./account.less'), require('./../app.less') ],

  template: require('./account.html')
})
export class AccountComponent {
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
