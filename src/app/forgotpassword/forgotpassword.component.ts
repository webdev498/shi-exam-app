import {Component} from '@angular/core';
import {UserInfoKey} from './../model/Constants';

@Component({
  styles: [ require('./forgotpassword.css') ],
  template: require('./forgotpassword.html')
})
export class ForgotPasswordComponent {
    emailAdress: string;
    
    constructor() {}
    
    submit() {
      
    }
}