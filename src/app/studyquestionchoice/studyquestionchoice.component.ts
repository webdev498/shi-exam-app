import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {MultipleChoice} from './../questions/multiplechoice/multiplechoice.component';
import {Matching} from './../questions/matching/matching.component';
import {Grouping} from './../questions/grouping/grouping.component';
import {FillInBlankComponent} from './../questions/fillinblank/fillinblank.component';
import {FlashcardComponent} from './../questions/flashcard/flashcard.component';
import {Term} from './../model/question/Term';
import {Category} from './../model/Category';
import {SelectionComponent} from './../study/category/selection.component';
import {SessionService} from './../services/session.service';
import {TermService} from './../services/term.service';
import {EventService} from './../services/event.service';

@Component({
  selector: 'studyquestionchoice',  
  styles: [ require('./studyquestionchoice.less') ],
  providers: [TermService],
  template: require('./studyquestionchoice.html'),
})
export class StudyQuestionChoiceComponent implements OnInit {  
    constructor(private _sessionService: SessionService,
      private _termService: TermService,
      private _eventService: EventService,
      private _router: Router) {} 

    public currentQuestionType: string;
    public fetching: boolean;
    public categoriesChosen: Category[] = new Array();

    ngOnInit() {
      if (this._sessionService.getCategories() === undefined) {
        this._router.navigate(['study']);
        return;
      }
      this.categoriesChosen = this._sessionService.getCategories();
    }

    start(questionType: string) {
      this.fetching = true;
      this.currentQuestionType = questionType;   

      this._termService.termsByCategory(this.categoriesChosen, 'Spanish',500)
          .subscribe(
          response => this._handleTermResponse(response),
          error => this._handleError(error)
        );
    }

    _handleTermResponse(response: any) {
      
    }

    _handleError(error: any) {
      this._eventService.broadcast('error', 'There was an issue downloading the terms');
      console.error(error);
    }
}