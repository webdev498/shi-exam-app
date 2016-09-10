import {Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import {AuthService} from './services/auth.service';
import {EventService} from './services/event.service';
import { AppStore } from './app.store';

@Component({
  selector: 'app',
  template: require('./app.html'),
  styles: [ require('./app.less') ]
})

export class App implements OnInit {
  url = 'http://www.commongroundinternational.com';
  currentYear = new Date().getFullYear();
  showErrorModal: boolean = false;
  errorMessage: string = '';

  constructor(private _authService: AuthService,
              private _eventService: EventService,
              public appStore: AppStore) {
    
              }

  loggedIn() {
    return this._authService.loggedIn();
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
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }
}
