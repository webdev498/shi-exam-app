import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'studydashboard',  
  template: require('./studydashboard.html'),
})
export class StudyDashboardComponent {
    
    constructor(private _router: Router) {}

    selected(nav: string) {
      this._router.navigate(['studyquestionchoice']);
    }   
}