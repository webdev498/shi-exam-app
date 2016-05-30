import {UserTokenKey} from './../model/Constants';
import {UserInfoKey} from './../model/Constants';
import {User} from './../model/User';
import {JwtHelper} from 'angular2-jwt';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
    jwt = new JwtHelper();
    constructor() {}
    
    loggedIn() {
        if (localStorage[UserTokenKey] !== null) {
            //Check if it's expired
            return true;    
        }
        
        return false;
    }
    
    saveToken(token) {
        localStorage.setItem(UserTokenKey, JSON.stringify(token));
    }
    
    saveUser(user) {
        localStorage.setItem(UserInfoKey, JSON.stringify(user));
    }
    
    tokenUserInfo() {
        return <User>this.jwt.decodeToken(JSON.parse(localStorage[UserTokenKey]));
    }
}