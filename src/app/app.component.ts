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
      if (user !== null)
        return user.firstName + ' ' + user.lastName;
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
