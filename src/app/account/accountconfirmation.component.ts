import {Component} from '@angular/core';
import {AccountService} from './account.service';

@Component({
  styles: [ ],
  providers: [AccountService],
  template: require('./accountconfirmation.html')
})
export class AccountConfirmationComponent {

  constructor(private _accountService: AccountService) {}

}
