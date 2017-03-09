import {Component, Input} from '@angular/core';

import {ExamService} from './../../exam/exam.service';
import {Feedback} from './../../model/exam/Feedback';

@Component({
  selector: 'feedback',  
  styles: [ require('./feedback.less') ],
  template: require('./feedback.html'),
  providers: [ExamService]
})
export class FeedbackComponent {  
    constructor(private _examService: ExamService) {} 

    @Input() enableFeedback: boolean = false;
    @Input() feedbackSubmitted: boolean = false;
    @Input() feedbackText: string;
    @Input() examid: string;
    @Input() currentQuestion: any;

    feedback() {
      this.enableFeedback = true;
    }

    submitFeedback() {
      this.feedbackSubmitted = true;
      this.enableFeedback = false;

      if (this.feedbackText != null) {
        let feedback = new Feedback();
        feedback.examId = this.examid;
        feedback.text = this.feedbackText;
        feedback.question = this.currentQuestion;

        this._examService.submitFeedback(feedback)
          .subscribe(
            response => {},
            error => {}
        );
      }
    }
}