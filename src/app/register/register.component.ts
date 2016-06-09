import {Component, OnInit} from '@angular/core';
import {Registration} from './../model/Registration';
import {MaskDirective} from './../directives/mask.directive';
import {PasswordMinLength} from './../model/Constants';
import {NationalityService} from './../services/nationality.service';
import {CountryCodeService} from './../services/countrycode.service';
import {StateService} from './../services/state.service';
import {DayService} from './../services/day.service';
import {MonthService} from './../services/month.service';
import {YearService} from './../services/year.service';
import {RegistrationService} from './register.service';
import {CountryCode} from './../model/CountryCode';
import {Day} from './../model/Day';
import {Month} from './../model/Month';

@Component({
  selector: 'register', 

  directives: [
    MaskDirective
  ],

  providers: [NationalityService, CountryCodeService, DayService,
    MonthService, YearService, StateService, RegistrationService],

  styles: [ require('./register.less') ],

  template: require('./register.html')
})
export class RegisterComponent implements OnInit {
  // Set our default values
  validationMessage: string;
  ur: Registration;
  countryCodes: CountryCode[];
  years: string[];
  states: string[];
  months: Month[];
  days: Day[];
  updatePasswordEnabled: boolean = true;

  // TypeScript public modifiers
  constructor(private nationalityService: NationalityService,
              private countryCodeService: CountryCodeService,
              private dayService: DayService,
              private monthService: MonthService,
              private yearService: YearService,
              private stateService: StateService,
              private regService: RegistrationService) {
      this.validationMessage = '';
      this.ur = new Registration();
      this.countryCodes = countryCodeService.countryCodes();
      this.years = yearService.years();
      this.months = monthService.months();
      this.days = dayService.days();
      this.states = stateService.states();
  }
  
  submitButtonState() {
      if (this.ur.firstName.length > 0
          && this.ur.lastName.length > 0)
          return false;
      else
        return true;
  }
  
  submitRegistration() {
      
  }
  
  ngOnInit() {

  }

}
