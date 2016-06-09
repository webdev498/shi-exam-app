import {Component, OnInit} from '@angular/core';
import {PasswordMinLength} from './../model/Constants';
import {RegistrationStartInfo} from './../model/Constants';
import {RegistrationService} from './register.service';
import {RegistrationStart} from './../model/RegistrationStart';

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

  constructor(private regService: RegistrationService) {
      this.validationMessage = '';
      this.rs = new RegistrationStart();
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
  }
  
  ngOnInit() {
      //Set focus on email address text box
  }

}
