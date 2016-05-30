import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl } from './../model/Constants';
import { User } from './../model/User';

@Injectable()
export class UserService {
  constructor(private _http: Http) { }

  getUser(id) {    
    return this._http.get(RootApiUrl + '/users/' + id)
      .map((response: Response) => <User>response.json())
      //.do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}