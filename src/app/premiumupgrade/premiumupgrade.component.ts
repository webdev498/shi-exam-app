import {Subscription } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'premiumupgrade',  
  styles: [ require('./premiumupgrade.less'), require('./../app.less') ],
  template: require('./premiumupgrade.html')
})
export class PremiumUpgradeComponent implements OnInit {
    constructor() {}
    
    ngOnInit() {

    }
}