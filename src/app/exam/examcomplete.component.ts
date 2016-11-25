import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExamResponseService} from './../services/examresponse.service';
import {Score} from './../model/exam/Score';

@Component({
  styles: [ require('./examcomplete.less') ],
  template: require('./examcomplete.html'),
  providers: [ExamResponseService]
})
export class ExamCompleteComponent implements OnInit {
    
    constructor(private _router: Router,
               private _examResponse: ExamResponseService) 
               {}

    public examScore: Score;

   ngOnInit() {
     this.examScore = this._examResponse.examResults();
   }   

   iconStyle() {
     return this.examScore.overallPassed ? 'examSuccessIcon' : 'examFailIcon';
   }

   textColor() {
     return this.examScore.overallPassed ? 'examSuccess' : 'examFail';
   }

   didPass() {
     return this.examScore.overallPassed;
   }

   didFail() {
     return this.examScore.overallPassed === false;
   }
}