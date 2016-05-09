import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl } from "./../../Constants";
import { LoginResponse} from "./../model/LoginResponse"

@Injectable()
export class LoginService {
  constructor(private _http: Http) { }

  postLogin(username, password) {
    return this._http.post(RootApiUrl + '\login',
    JSON.stringify({
        username: username,
        password: password
    }))
      .map((response: Response) => <LoginResponse[]>response.json().data)
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}