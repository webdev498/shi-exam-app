import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl, AuthHeaderKey } from './../model/Constants';
import { ExamResponse } from './../model/exam/ExamResponse';
import { AnswerInterface } from './../model/interface/Answer.interface';
import { AuthService } from './../services/auth.service';

@Injectable()
export class ExamService {
  constructor(private _http: Http,
             private _authService: AuthService) { }

  createExam(userid: string, examType: string) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append(AuthHeaderKey,this._authService.getToken());
    var payload = JSON.stringify({tier: 1, type: examType});
    
      return this._http.post(RootApiUrl + '/exams',payload, {
        headers: headers
      })
      //return this._http.get('/realexam.json')
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  
  submitAnswers(examid: string, answers: AnswerInterface[]) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append(AuthHeaderKey,this._authService.getToken());
    var payload = JSON.stringify(answers);
    let userId = this._authService.getUser().id;
    
    return this._http.post(RootApiUrl + '/users/' + userId + '/exams/' + examid + '/submissions', payload, {
      headers: headers
    })
      .map((response: Response) => <ExamResponse>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}