import {Component} from '@angular/core';
import { UserInfoKey } from './../model/Constants';
import { User } from './../model/User';
import { Registration } from './../model/Registration';
import { AuthService } from './../services/auth.service';

import {NationalityService} from './../services/nationality.service';
import {CountryCodeService} from './../services/countrycode.service';
import {StateService} from './../services/state.service';
import {DayService} from './../services/day.service';
import {MonthService} from './../services/month.service';
import {YearService} from './../services/year.service';
import {EventService} from './../services/event.service';

import {CountryCode} from './../model/CountryCode';
import {Day} from './../model/Day';
import {Month} from './../model/Month';
import {Address} from './../model/Address';

@Component({
  selector: 'account', 
  providers: [
    NationalityService, CountryCodeService, StateService,
    DayService, MonthService, YearService, EventService
  ],
  pipes: [ ],
  styles: [ require('./account.less'), require('./../app.less') ],
  template: require('./account.html')
})
export class AccountComponent {
  registration: Registration;
  updatePassword: boolean = false;
  validationMessage: string = '';
  countryCodes: CountryCode[];
  years: string[];
  states: string[];
  months: Month[];
  nationalities: any[];
  days: Day[];

  constructor(private _authService: AuthService,
             private _nationalityService: NationalityService,
             private _countryCodeService: CountryCodeService,
             private _stateService: StateService,
             private _dayService: DayService,
             private _monthService: MonthService,
             private _yearService: YearService,
             private _eventService: EventService) {
      this.countryCodes = _countryCodeService.countryCodes();
      this.years = _yearService.years();
      this.months = _monthService.months();
      this.days = _dayService.days();
      this.states = _stateService.states();
      this.registration = new Registration();
  }

  submitButtonState() {
    if (this.registration.email.length > 0 &&
        this.registration.firstName.length > 0 &&
        this.registration.lastName.length > 0) {
          return false;
        }
  }

  submitAccount() {

  }

  logout(event) {
      this._authService.logout();
      event.preventDefault();
      event.stopPropagation();
  }

 _handleError(error, message) {
    this._eventService.broadcast('error', message);
    console.error(error);
  }

  _handleNationalityResponse(response) {
    this.nationalities = response;

    let user = this._authService.getUser();
    let userRegistration = new User(user.id, user.firstName, user.lastName,
      user.email, user.gender, user.dateOfBirth, user.relations);
    this.registration = userRegistration.getRegistration();
  }
  
  ngOnInit() {
       this._nationalityService.getNationalities()
        .subscribe(
            response => this._handleNationalityResponse(response),
            error => this._handleError(error, 'There was an error retrieving the nationalities')
        );
  }

}
