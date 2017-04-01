import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl, AuthHeaderKey } from './../model/Constants';
import { AuthService } from './../services/auth.service';
import { StudyTerm } from './../model/question/StudyTerm';
var _ = require('lodash');

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
        return `${prev}&categories=${curr}`;
    });   

    let url = '';
    if (language != null)
      url = `${RootApiUrl}/terms/languages/${language}?withTranslations=true&count=${count.toString()}&categories=${catarray}`;
    else
      url = `${RootApiUrl}/terms?count=${count.toString()}&categories=${catarray}`;

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

  studyTermCollection(terms: any) : StudyTerm[] {
    let studyTerms: StudyTerm[] = new Array();

    for (let i = 0; i < terms.length; i++) {
      let source = terms[i];
      let studyTerm = new StudyTerm();
      studyTerm.id = source.id;
      studyTerm.value = source.value;
      studyTerm.sourcelanguage = source.relations.language.name;
      studyTerm.translations = new Array();

      for (let j = 0; j < terms[i].relations.englishTranslations.length; j++) {
        let translation = terms[i].relations.englishTranslations[j];
        let ts = new StudyTerm();
        ts.id = translation.id;
        ts.value = translation.value;
        ts.sourcelanguage = translation.relations.language.name;
        studyTerm.translations.push(ts);
      }

      studyTerms.push(studyTerm);
    }

    return _.shuffle(studyTerms);
  }
}
