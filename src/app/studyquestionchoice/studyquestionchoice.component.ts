import {Component, OnInit} from '@angular/core';

import {MultipleChoice} from './../questions/multiplechoice/multiplechoice.component';
import {Matching} from './../questions/matching/matching.component';
import {Grouping} from './../questions/grouping/grouping.component';
import {FillInBlankComponent} from './../questions/fillinblank/fillinblank.component';
import {FlashcardComponent} from './../questions/flashcard/flashcard.component';
import {Term} from './../model/question/Term';
import {SelectionComponent} from './../study/category/selection.component';


@Component({
  selector: 'studyquestionchoice',  
  styles: [ require('./studyquestionchoice.less') ],
  template: require('./studyquestionchoice.html'),
})
export class StudyQuestionChoiceComponent implements OnInit {  
    constructor() {} 

    public currentQuestionType: string;
    public fetching: boolean;

    ngOnInit() {

    }

    start(questionType: string) {
      this.fetching = true;
      this.currentQuestionType = questionType;   
    }
}