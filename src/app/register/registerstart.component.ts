import {Component, OnInit} from '@angular/core';
import {PasswordMinLength} from './../model/Constants';
import {RegistrationStartInfo} from './../model/Constants';
import {RegistrationService} from './register.service';
import {RegistrationStart} from './../model/RegistrationStart';

import {Router} from '@angular/router';
import {NgForm, Validators} from '@angular/forms';

@Component({
  directives: [
  ],
  providers: [RegistrationService],
  styles: [ require('./register.less') ],
  template: require('./registerstart.html')
})
export class RegisterStartComponent implements OnInit {
  validationMessage: string;
  rs: RegistrationStart;

  constructor(private _regService: RegistrationService,
                private _router: Router) {
      this.validationMessage = '';
      this.rs = new RegistrationStart();
  }

  facebook() {

  }

  google() {

  }
  
  submitButtonState() {
      if (this.rs.email.length > 0
          && this.rs.password.length >= PasswordMinLength
          && this.rs.passwordConfirmation.length >= PasswordMinLength
          && this.rs.password == this.rs.passwordConfirmation)
          return false;
      else
        return true;
  }
  
  register() {
      //Verify email address is unique
      
      //Set data for usage later
      sessionStorage.setItem(RegistrationStartInfo, JSON.stringify(this.rs));
      //Redirect to register.component
      this._router.navigateByUrl('register');
  }
  
  ngOnInit() {
      //Set focus on email address text box
  }

}
