import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ExamService} from './exam.service';
import {AuthService} from './../services/auth.service';
import {EventService} from './../services/event.service';

import {Exam} from './../model/exam/Exam';
import {ExamStartParam} from './../model/Constants';

import {MultipleChoice} from './../questions/multiplechoice/multiplechoice.component';
import {Matching} from './../questions/matching/matching.component';
import {Grouping} from './../questions/grouping/grouping.component';
import {Choice} from './../model/question/Choice';

@Component({
  selector: 'exam',  
  styles: [ require('./exam.less'), require('./../app.less') ],
  template: require('./exam.html'),
  providers: [ExamService],
  directives: [MultipleChoice, Matching, Grouping]
})
export class ExamComponent implements OnInit {
    processing: boolean = true;
    exam: Exam;
    currentQuestion: any;
    currentQuestionType: string;
    answer: any;

    constructor(private _examService: ExamService,
              private _authService: AuthService,
              private _eventService: EventService,
              private _route: ActivatedRoute) 
    {

    }
    
    ngOnInit() {
      let typeParam = this._route.snapshot.params["ExamStartParam"];
      this._examService.createExam(this._authService.getUser().id,typeParam)
          .subscribe(
          response => this._handleExamResponse(response),
          error => this._handleError(error)
        );
    }

    _handleExamResponse(response: any) {
      this.exam = new Exam();
      this.exam.mapExam(response[0]);
      console.log(this.exam);

      this.currentQuestionType = this.exam.questions[0].questionType;
      this.currentQuestion = this.exam.questions[0];

      this.processing = false;
    }

    nextQuestion() {
      console.log(this.currentQuestion);
    }

    choiceSelected(event: any) {
      this.answer = event.id;
    }

    nextDisabled() {
      return this.answer == null;
    }

    _handleError(error: any) {
      this._eventService.broadcast('error', 'There was an issue creating your exam');
      console.error(error);
    }
}