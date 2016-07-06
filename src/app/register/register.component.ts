import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/common';

import {Registration} from './../model/Registration';
import {RegistrationStartInfo} from './../model/Constants';
import {UserAccount} from './../model/dto/UserAccount';

import {RegistrationStart} from './../model/RegistrationStart';

import {NationalityService} from './../services/nationality.service';
import {CountryCodeService} from './../services/countrycode.service';
import {StateService} from './../services/state.service';
import {DayService} from './../services/day.service';
import {MonthService} from './../services/month.service';
import {YearService} from './../services/year.service';
import {RegistrationService} from './register.service';
import {AuthService} from './../services/auth.service';

import {CountryCode} from './../model/CountryCode';
import {Day} from './../model/Day';
import {Month} from './../model/Month';
import {Address} from './../model/Address';

var _ = require('lodash');

@Component({
  selector: 'register', 

  directives: [
  ],

  providers: [
    NationalityService, CountryCodeService, DayService,
    MonthService, YearService, StateService, RegistrationService,
    AuthService
    ],

  styles: [ require('./register.less'), require('./../app.less') ],

  template: require('./register.html')
})
export class RegisterComponent implements OnInit {
  // Set our default values
  validationMessage: string;
  ur: Registration;
  rs: RegistrationStart;
  countryCodes: CountryCode[];
  years: string[];
  states: string[];
  months: Month[];
  nationalities: any[];
  days: Day[];
  updatePasswordEnabled: boolean = true;

  // TypeScript public modifiers
  constructor(private _nationalityService: NationalityService,
              private _countryCodeService: CountryCodeService,
              private _dayService: DayService,
              private _monthService: MonthService,
              private _yearService: YearService,
              private _stateService: StateService,
              private _regService: RegistrationService,
              private _router: Router,
              private _authService: AuthService) {
      this.validationMessage = '';
      this.ur = new Registration();
      this.ur.address = new Address();
      this.countryCodes = _countryCodeService.countryCodes();
      this.years = _yearService.years();
      this.months = _monthService.months();
      this.days = _dayService.days();
      this.states = _stateService.states();
  }
  
  submitButtonState() {
      if (this.ur.firstName.length > 0
          && this.ur.lastName.length > 0)
          return false;
      else
        return true;
  }
  
  submitRegistration() {
      this.validationMessage = '';
      let userAccount = new UserAccount().setPayload(this.ur);
      let payload = userAccount.getPayload();
      this._regService.postRegistration(payload)
        .subscribe(
            response => this._handleRegistrationResponse(response),
            error => this._handleError(error, 'There was an error during the registration process')
        );
  }

  _handleRegistrationResponse(response) {
    console.log(response);
    //this._authService.saveUser(response);
    //show confirmation and tell user to login
    //this._router.navigateByUrl('login');
  }

  _handleError(error, message) {
    this.validationMessage = message;
    console.error(error);
  }

  _handleNationalityResponse(response) {
    this.nationalities = response;
    let american = _.find(this.nationalities, function(o) { return o.name === 'American'; });
    this.ur.nationality = american.id;
  }
  
  ngOnInit() {
    if (sessionStorage[RegistrationStartInfo] != null) {
      const startInfo = <RegistrationStart>JSON.parse(sessionStorage.getItem(RegistrationStartInfo));
      this.ur.email = startInfo.email;
      this.ur.password = startInfo.password;
      this.ur.passwordConfirmation = startInfo.passwordConfirmation;
      
      this._nationalityService.getNationalities()
        .subscribe(
            response => this._handleNationalityResponse(response),
            error => this._handleError(error, 'There was an error retrieving the nationalities')
        );
    }
  }

}
