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
        if (localStorage[UserTokenKey] != null) {
            if (this.jwt.isTokenExpired(localStorage[UserTokenKey]))
                return false;
                
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
        if (localStorage[UserTokenKey] != null) {
        return <User>this.jwt.decodeToken(JSON.parse(localStorage[UserTokenKey]));
        } else {
            return null;
        }
    }
}