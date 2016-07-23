import {Component} from '@angular/core';
import { UserInfoKey } from './../model/Constants';
import { User } from './../model/User';
import { Registration } from './../model/Registration';
import { AuthService } from './../services/auth.service';
import { AccountService } from './account.service';

import {UserAccount} from './../model/dto/UserAccount';

import {NationalityService} from './../services/nationality.service';
import {CountryCodeService} from './../services/countrycode.service';
import {StateService} from './../services/state.service';
import {DayService} from './../services/day.service';
import {MonthService} from './../services/month.service';
import {YearService} from './../services/year.service';
import {EventService} from './../services/event.service';
import {ValidationService} from './../services/validation.service';

import {CountryCode} from './../model/CountryCode';
import {Day} from './../model/Day';
import {Month} from './../model/Month';
import {Address} from './../model/Address';

@Component({
  selector: 'account', 
  providers: [
    NationalityService, CountryCodeService, StateService,
    DayService, MonthService, YearService, EventService,
    ValidationService, AccountService
  ],
  pipes: [ ],
  styles: [ require('./account.less'), require('./../app.less') ],
  template: require('./account.html')
})
export class AccountComponent {
  registration: Registration;
  updatePassword: boolean = false;
  countryCodes: CountryCode[];
  years: string[];
  states: string[];
  months: Month[];
  nationalities: any[];
  days: Day[];
  emailValid: boolean = true;
  accountMessage: string;

  constructor(private _authService: AuthService,
             private _nationalityService: NationalityService,
             private _countryCodeService: CountryCodeService,
             private _stateService: StateService,
             private _dayService: DayService,
             private _monthService: MonthService,
             private _yearService: YearService,
             private _eventService: EventService,
             private _validationService: ValidationService,
             private _accountService: AccountService) {
      this.countryCodes = _countryCodeService.countryCodes();
      this.years = _yearService.years();
      this.months = _monthService.months();
      this.days = _dayService.days();
      this.states = _stateService.states();
      this.registration = new Registration();
      this.accountMessage = '';
  }

  submitButtonState() {
    if (this.registration.email.length > 0 &&
        this.registration.firstName.length > 0 &&
        this.registration.lastName.length > 0) {
          return false;
        }

    if (this.updatePassword) {
      if (this.registration.password != null && 
        this.registration.password.length >= 8 &&
        this.registration.passwordConfirmation != null && 
        this.registration.passwordConfirmation.length >= 8 &&
        this.registration.password === this.registration.passwordConfirmation) {
          return false;
        } else {
          return true;
        }
    }

    return true;
  }

    emailValidation() {
      if (this.registration.email.length > 0) {
          if (!this._validationService.emailIsValid(this.registration.email)) {
            return false;
          }
          else {
            return true;
         } 
      } 
  }

  submitAccount() {
    if (!this.emailValidation()) {
      this._validation('Email address is invalid');
      return;
    }

      let userAccount = new UserAccount().setPayload(this.registration);
      let payload = userAccount.getPayload();
      this._accountService.putUser(payload)
        .subscribe(
            response => this._handleAccountResponse(response),
            error => this._handleError(error, 'There was an error updating your account')
        );
  }

  _handleAccountResponse(user) {
    this._authService.saveUser(user);   
    this.accountMessage = 'Account updated successfully';
  }

  updatePasswordClick() {
    if (!this.updatePassword) {
      //reset the passwords if they choose not to update
      this.registration.password = null;
      this.registration.passwordConfirmation = null;
    }
  }

  logout(event) {
      this._authService.logout();
      event.preventDefault();
      event.stopPropagation();
  }

  _validation(message) {
    this._eventService.broadcast('error',message);
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
