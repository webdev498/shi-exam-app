import {Component, OnInit} from '@angular/core';
import {PasswordMinLength} from './../model/Constants';
import {RegistrationStartInfo} from './../model/Constants';
import {RegistrationService} from './register.service';
import {ValidationService} from './../services/validation.service';
import {RegistrationStart} from './../model/RegistrationStart';

import {Router} from '@angular/router';
import {NgForm, Validators} from '@angular/forms';

@Component({
  directives: [
  ],
  providers: [RegistrationService, ValidationService],
  styles: [ require('./register.less') ],
  template: require('./registerstart.html')
})
export class RegisterStartComponent implements OnInit {
  validationMessage: string;
  rs: RegistrationStart;
  emailValid: boolean = true;

  constructor(private _regService: RegistrationService,
                private _router: Router,
                private _validator: ValidationService) {
      this.validationMessage = '';
      this.rs = new RegistrationStart();
  }

  facebook() {

  }

  google() {

  }
  
  submitButtonState() {
      if (this.rs.email.length > 0
          && this.emailValid
          && this.rs.password.length >= PasswordMinLength
          && this.rs.passwordConfirmation.length >= PasswordMinLength
          && this.rs.password == this.rs.passwordConfirmation)
          return false;
      else
        return true;
  }

  emailValidation() {
      if (this.rs.email.length > 0) {
          if (!this._validator.emailIsValid(this.rs.email)) {
            this.emailValid = false;
            this.validationMessage = 'Email address is invalid';
          }
      } else {
          this.emailValid = true;
          this.validationMessage = '';
      }
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
