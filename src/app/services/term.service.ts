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
            .map((c) => {return c.id; })
            .reduce((prev, curr) => {
        return `${prev}&categories[]=${curr}`;
    });   

    let url = '';
    if (language != null)
      url = `${RootApiUrl}/terms/languages/${language}?count=${count.toString()}${catarray}`;
    else
      url = `${RootApiUrl}/terms?count=${count.toString()}&categories[]=${catarray}`;

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