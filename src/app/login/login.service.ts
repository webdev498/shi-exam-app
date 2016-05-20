import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl } from './../model/Constants';
import { LoginResponse} from './../model/LoginResponse';

@Injectable()
export class LoginService {
  constructor(private _http: Http) { }

  postLogin(username:string, password:string) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var credentials = JSON.stringify({email: username, password: password});
    
    return this._http.post(RootApiUrl + '/login',credentials, {
      headers: headers
    })
      .map((response: Response) => <LoginResponse>response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}