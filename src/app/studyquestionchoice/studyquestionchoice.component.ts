import {Component} from '@angular/core';

@Component({
  selector: 'studyquestionchoice',  
  styles: [ require('./studyquestionchoice.less') ],
  template: require('./studyquestionchoice.html'),
})
export class StudyQuestionChoiceComponent {  
    constructor() {} 

    start(questionType: number) {
        
    }
}