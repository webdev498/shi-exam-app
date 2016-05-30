import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl } from './../model/Constants';
import { Nationality } from './../model/Nationality';

@Injectable()
export class NationalityService {
  constructor(private _http: Http) { }

  getNationalities() {    
    return this._http.get(RootApiUrl + '/nationalities')
      .map((response: Response) => <Nationality>response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}