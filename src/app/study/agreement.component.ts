import {Subscription } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'studyagreement',  
  styles: [ require('./agreement.less'), require('./../app.less') ],
  template: require('./agreement.html')
})
export class AgreementComponent implements OnInit, OnDestroy {
    constructor(private _activatedRoute: ActivatedRoute) {}
    
    private subscription: Subscription;
    private _token: string;

    ngOnInit() {
        // subscribe to router event
        this.subscription = this._activatedRoute.params.subscribe(
          (param: any) => {
            this._token = param['token'];
          });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
  }
}