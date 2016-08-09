import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ExamService} from './exam.service';
import {AuthService} from './../services/auth.service';
import {EventService} from './../services/event.service';

import {Exam} from './../model/exam/Exam';
import {ExamStartParam, MatchingQuestionType, 
        MultipleChoiceQuestionType, GroupingQuestionType, 
        TermsShown} from './../model/Constants';
import {ExamProgressService} from './../services/examprogress.service';

import {MultipleChoice} from './../questions/multiplechoice/multiplechoice.component';
import {Matching} from './../questions/matching/matching.component';
import {Grouping} from './../questions/grouping/grouping.component';
import {Choice} from './../model/question/Choice';

@Component({
  selector: 'exam',  
  styles: [ require('./exam.less'), require('./../app.less') ],
  template: require('./exam.html'),
  providers: [ExamService, ExamProgressService],
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
              private _route: ActivatedRoute,
              private _examProgress: ExamProgressService) 
    {

    }
    
    ngOnInit() {
      if (this._examProgress.getProgress() != null) {
        //TODO:  Ask user if they want to continue where they left off
      }

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
      this._examProgress.setCurrentExam(this.exam);
      this._nextQuestion();
    }

    saveResponse() {
      this.processing = true;
      this._examProgress.saveProgress(this.currentQuestion.id, 
      this.currentQuestionType,
      this.answer);

      this._nextQuestion();
    }

    _nextQuestion() {
      this.currentQuestionType = this._examProgress.nextQuestion().questionType;
      this.currentQuestion = this._examProgress.nextQuestion();
      this.processing = false;

      switch (this.currentQuestionType)
      {
        case MultipleChoiceQuestionType:
          this.answer = null;
        case MatchingQuestionType:
        case GroupingQuestionType:
           this.answer = new Array();
        break;
      }
    }

    choiceSelected(event: any) {
      switch (this.currentQuestionType)
      {
        case MultipleChoiceQuestionType:
          this.answer = event;
          break;
        case MatchingQuestionType:
        case GroupingQuestionType:
           this.answer.push(event);
        break;
      }
    }

    nextDisabled() {
      let disabled = true;

      switch (this.currentQuestionType)
      {
        case MultipleChoiceQuestionType:
          disabled = this.answer == null ? true : false;
          break;
        case MatchingQuestionType:
          disabled = this.answer.length !== TermsShown ? true : false;
        break;
        case GroupingQuestionType:
          console.log(this.answer);
        break;
      }

      return disabled;
    }

    submitButtonText() {
      if (!this._examProgress.isLastQuestion())
        return 'Next Question';
      else
        return 'Submit Answers';
    }

    _handleError(error: any) {
      this._eventService.broadcast('error', 'There was an issue creating your exam');
      console.error(error);
    }
}