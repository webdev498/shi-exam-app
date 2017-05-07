import {Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import {AuthService} from './services/auth.service';
import {EventService} from './services/event.service';
import { AppState } from './app.service';

@Component({
  selector: 'app',
  template: require('./app.html'),
  styles: [ ]
})

export class App implements OnInit {
  url = 'http://www.commongroundinternational.com';
  currentYear = new Date().getFullYear();
  showErrorModal: boolean = false;
  errorMessage: string = '';

  constructor(private _authService: AuthService,
              private _eventService: EventService,
              public appState: AppState) {
    
              }

  loggedIn() {
    return this._authService.loggedIn();
  }

  studyAccess() {
    return this._authService.loggedIn() && this._authService.premierUser();
  }

    loggedInUser() {
      var user = this._authService.tokenUserInfo();
      if (user !== null) {
        let name = user.firstName;
        if (name.length <= 10) {
          if (name.length + user.lastName.length <= 15)
            return `${user.firstName} ${user.lastName}`;
          else {
            if (user.lastName.length >= 4)  
              return `${user.firstName} ${user.lastName.substr(0,4)}`;
            else
              return `${user.firstName}...`;
          }
        } else
          return user.firstName;
      }
    }

  ngOnInit() {
   let appInstance = this;
        this._eventService.on('error', function(message) {
            appInstance.showErrorModal = true;
            appInstance.errorMessage = message;
        });

    console.log('Initial App State', appInstance.appState.state);
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }
}
