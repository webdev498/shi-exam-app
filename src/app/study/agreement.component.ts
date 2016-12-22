import {Component} from '@angular/core';

@Component({
  selector: 'studyagreement',  
  styles: [ require('./agreement.less'), require('./../app.less') ],
  template: require('./agreement.html')
})
export class AgreementComponent {
    constructor() {}
    
    private _token: string;
}