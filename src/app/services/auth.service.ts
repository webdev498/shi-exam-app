import {UserTokenKey} from './../model/Constants';
import {UserInfoKey} from './../model/Constants';
import {User} from './../model/User';
import {JwtHelper} from 'angular2-jwt';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
    jwt = new JwtHelper();
    constructor(private _router: Router) {}
    
    loggedIn() {
        if (localStorage[UserTokenKey] != null) {
            if (this.jwt.isTokenExpired(JSON.parse(localStorage[UserTokenKey]).token))
                return false;
                
            return true;    
        }
        
        return false;
    }

    logout() {
        localStorage.clear();
        this._router.navigate['home'];
    }

    getToken() :string {
        if (localStorage[UserTokenKey] != null) {
            return JSON.parse(localStorage[UserTokenKey]).token;
        } else {
            return null;
        }
    }

    getUser() :User {
        return <User>JSON.parse(localStorage[UserInfoKey]);
    }
    
    saveToken(token) {
        localStorage.setItem(UserTokenKey, JSON.stringify(token));
    }
    
    saveUser(user) {
        localStorage.setItem(UserInfoKey, JSON.stringify(user));
    }
    
    tokenUserInfo() :User {
        if (localStorage[UserTokenKey] != null) {
        return <User>this.jwt.decodeToken(JSON.parse(localStorage[UserTokenKey]).token);
        } else {
            return null;
        }
    }
}