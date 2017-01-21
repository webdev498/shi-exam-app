import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './../services/auth.service';

@Component({
  selector: 'examhistory',  
  styles: [ require('./examhistory.less'), require('./../app.less') ],
  template: require('./examhistory.html')
})
export class ExamHistoryComponent implements OnInit {
    
    constructor(private _router: Router,
                private _authService: AuthService) 
                {

                }
    
    ngOnInit() {
      if (!this._authService.premierUser()) {
        this._router.navigate(['premiumupgrade']);
      }
    }
}