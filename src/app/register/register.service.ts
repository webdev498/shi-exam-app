import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl } from './../model/Constants';
import { Registration} from './../model/Registration';
import { User} from './../model/User';

@Injectable()
export class RegistrationService {
  constructor(private _http: Http) { }

  postRegistration(reg:Registration) {
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