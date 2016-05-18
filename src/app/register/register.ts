import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Registration} from './../model/Registration';

@Component({
  selector: 'register', 

  providers: [
    
  ],

  pipes: [ ],

  styles: [ require('./register.css') ],

  template: require('./register.html')
})
export class Register {
  // Set our default values
  validationMessage: string;
  ur: Registration;

  // TypeScript public modifiers
  constructor() {
      this.validationMessage = '';
      this.ur = new Registration();
  }
  
  submitButtonState() {
      return true;
  }
  
  submitRegistration() {
      
  }
  
  ngOnInit() {

  }

}
