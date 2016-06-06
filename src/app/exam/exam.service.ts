import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl } from './../model/Constants';
import { Exam } from './../model/exam/Exam';
import { ExamResponse } from './../model/exam/ExamResponse';
import { AnswerInterface } from './../model/interface/Answer.interface';

@Injectable()
export class ExamService {
  constructor(private _http: Http) { }

  createExam(userid: string, examType: string) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var payload = JSON.stringify({userid: userid, type: examType});
    
    return this._http.post(RootApiUrl + '/exam',payload, {
      headers: headers
    })
      .map((response: Response) => <Exam>response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }
  
  submitAnswers(examid: string, answers: AnswerInterface[]) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var payload = JSON.stringify(answers);
    
    return this._http.post(RootApiUrl + '/exam/' + examid, payload, {
      headers: headers
    })
      .map((response: Response) => <ExamResponse>response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}