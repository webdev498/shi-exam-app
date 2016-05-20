import {UserTokenKey} from './../model/Constants';
import {JwtHelper} from 'angular2-jwt';

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