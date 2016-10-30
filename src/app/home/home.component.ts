import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService as CGIAuth} from './../services/auth.service';

@Component({
  selector: 'home',  // <home></home>
  styles: [ require('./home.less') ],
  template: require('./home.html')
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router,
              private _cgiAuth: CGIAuth) {
      
  }

  ngOnInit() {
    //navigate to login screen if not logged in
    if (!this._cgiAuth.loggedIn())
      this._router.navigate(['login']);
  }

}
