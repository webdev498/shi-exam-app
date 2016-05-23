import {UserTokenKey} from './../model/Constants';
import {JwtHelper} from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    constructor() {}
    
    loggedIn() {
        if (localStorage[UserTokenKey] !== null) {
            //Check if it's expired
            return true;    
        }
        
        return false;
    }
}