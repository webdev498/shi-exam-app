import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'studydashboard',  
  template: require('./studydashboard.html'),
})
export class StudyDashboardComponent {
    
    constructor(private _router: Router) {}

    selected(nav: string) {
        switch (nav) {
            case 'category':
              this._router.navigate(['study']);
            break;
            case 'random':
              this._router.navigate(['studyquestionchoice']);
            break;
            case 'performance':
              this._router.navigate(['examhistory']);
            break;
        }
    }   
}