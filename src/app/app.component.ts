import {Component, ViewEncapsulation} from '@angular/core';

import {AuthService} from './services/auth.service';
import {AppState} from './app.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  providers: [ AuthService ],
  pipes: [],
  template: require('./app.html'),
  styles: [ require('./app.less') ]
})

export class App {
  url = 'http://www.commongroundinternational.com';
  currentYear = new Date().getFullYear();
  constructor(private _authService: AuthService,
              public appState: AppState) {
    
  }

  loggedIn() {
    return this._authService.loggedIn();
  }

    loggedInUser() {
      var user = this._authService.tokenUserInfo();
      if (user !== null)
        return user.firstName + ' ' + user.lastName;
    }
}
