import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl, AuthHeaderKey } from './../model/Constants';
import { User } from './../model/User';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AccountService {
  constructor(private _http: Http,
              private _authService: AuthService) { }

  putUser(user: any) {    
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());
    header.append('Content-Type','application/json');
    let authUser = this._authService.tokenUserInfo();
    user['id'] = authUser.id;
    let userData = JSON.stringify(user);
    return this._http.put(RootApiUrl + '/users/' + authUser.id, userData, {
      headers: header
    })
      .map((response: Response) => <User>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}