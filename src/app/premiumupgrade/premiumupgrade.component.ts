import {Subscription } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {EventService} from './../services/event.service';
import {AccountService} from './../account/account.service';

@Component({
  selector: 'premiumupgrade',  
  styles: [ require('./premiumupgrade.less'), require('./../app.less') ],
  template: require('./premiumupgrade.html')
})
export class PremiumUpgradeComponent implements OnInit {
    activatingStudy: boolean = false;
    
    constructor(private _eventService: EventService,
             private _accountService: AccountService) {}

    ngOnInit() {

    }

  activate() {
    this.activatingStudy = true;
    this._accountService.premierStudyActivate()
      .subscribe(
        response => this._handleStudyActivateResponse(response),
        error => this._handleError(error, 'There was an error upgrading your account')
      );
  }

  cancel() {
      this._accountService.premierStudyCancel()
        .subscribe(
        response => {},
        error => this._handleError(error, 'There was an error downgrading your account')
      );  
  }

   _handleError(error, message) {
    this.activatingStudy = false;
    this._eventService.broadcast('error', message);
    console.error(error);
  }

  _handleStudyActivateResponse(response) {
    this.activatingStudy = false;
    window.location.href = response.redirectUrl;
  }
}