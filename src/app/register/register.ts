import {Component} from '@angular/core';
import {Registration} from './../model/Registration';
import {MaskDirective} from './../directives/mask.directive';

@Component({
  selector: 'register', 

  directives: [
    MaskDirective
  ],

  pipes: [ ],

  styles: [ require('./register.css') ],

  template: require('./register.html')
})
export class RegisterComponent {
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
