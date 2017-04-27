import {Component} from '@angular/core';
import {SessionService} from './../services/session.service';

@Component({
  selector: 'studyscore',  
  template: require('./studyscore.html')
})
export class StudyScoreComponent  {
    constructor(private _sessionService: SessionService) {}

    public studyScore(): string {
        return this._sessionService.getStudyCorrect();
    }
}