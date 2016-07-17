import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl, AuthHeaderKey } from './../model/Constants';
import { User } from './../model/User';
import { AuthService } from './../services/auth.service';

@Injectable()
export class UserService {
  constructor(private _http: Http,
              private _authService: AuthService) { }

  getUser(id) {    
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());

    return this._http.get(RootApiUrl + '/users/' + id, {
      headers: header
    })
      .map((response: Response) => <User>response.json())
      //.do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}