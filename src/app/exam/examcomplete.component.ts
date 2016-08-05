import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  styles: [ require('./examcomplete.less'), require('./../app.less') ],
  template: require('./examcomplete.html'),
  providers: []
})
export class ExamCompleteComponent {
    
    constructor(private _router: Router) {}
    
}