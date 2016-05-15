import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl } from "./../../Constants";
import { Registration} from "./../model/Registration"
import { User} from "./../model/User"

@Injectable()
export class RegistrationService {
  constructor(private _http: Http) { }

  postLogin(reg:Registration) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var newUser = JSON.stringify(reg);
    
    return this._http.post(RootApiUrl + '/user',newUser, {
      headers: headers
    })
      .map((response: Response) => <User>response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}