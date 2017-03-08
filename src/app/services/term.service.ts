import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl, AuthHeaderKey } from './../model/Constants';
import { AuthService } from './../services/auth.service';

@Injectable()
export class TermService {
  constructor(private _http: Http,
              private _authService: AuthService) { }

  termsByCategory(categories: any[], language: string, count: number) {    
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());
    let catarray : string = categories
            .map(function (c) {return c.id; })
            .reduce(function (prev, curr) {
        return `${prev}&categories[]=${curr}`;
    });   

    const url = `${RootApiUrl}/languages/language/translations?count=${count.toString()}${catarray}`;
    return this._http.get(url, {
      headers: header
    })
      .map((response: Response) => <any>response.json())
      //.do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}