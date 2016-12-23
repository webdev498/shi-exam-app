import {Subscription } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import {AccountService} from './../account/account.service';
import {EventService} from './../services/event.service';

@Component({
  selector: 'studyagreement',  
  styles: [ require('./agreement.less'), require('./../app.less') ],
  template: require('./agreement.html')
})
export class AgreementComponent implements OnInit, OnDestroy, AfterContentInit {
    constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _eventService: EventService,
              private _accountService: AccountService) {}
    
    private subscription: Subscription;
    private _token: string;

    ngOnInit() {
        // subscribe to router event
        this.subscription = this._activatedRoute.params.subscribe(
          (param: any) => {
            this._token = param['token'];
          });
    }

    ngAfterContentInit() {
      this._accountService.premierStudyFinalize(this._token)        
        .subscribe(
            response => this._handleAccountResponse(response),
            error => this._handleError(error, 'There was an error updating your account')
        );
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
   }

   _handleAccountResponse(response: any) {
     //success!  Go back to home page
      this._router.navigate(['home']);
   }

   _handleError(error, message) {
      this._eventService.broadcast('error', message);
      console.error(error);
   }
}