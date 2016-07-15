import {Component} from '@angular/core';
import { UserInfoKey } from './../model/Constants';
import { User } from './../model/User';
import { Registration } from './../model/Registration';
import {AuthService} from './../services/auth.service';

@Component({
  selector: 'account', 
  providers: [
    
  ],
  pipes: [ ],
  styles: [ require('./account.less'), require('./../app.less') ],
  template: require('./account.html')
})
export class AccountComponent {
  registration: Registration;
  updatePassword: boolean = false;
  validationMessage: string = '';

  constructor(private _authService: AuthService) {

  }

  submitButtonState() {
    if (this.registration.email.length > 0 &&
        this.registration.firstName.length > 0 &&
        this.registration.lastName.length > 0) {
          return true;
        }
  }

  submitAccount() {

  }

  logout(event) {
      this._authService.logout();
      event.preventDefault();
      event.stopPropagation();
  }
  
  ngOnInit() {
      let user = <User>JSON.parse(localStorage[UserInfoKey]);
      this.registration = user.getRegistration();
  }

}
