import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './../services/auth.service';
import {ExamService} from './../exam/exam.service';
import {EventService} from './../services/event.service';

@Component({
  selector: 'examhistory',  
  styles: [ require('./examhistory.less'), require('./../app.less') ],
  providers: [ExamService],
  template: require('./examhistory.html')
})
export class ExamHistoryComponent implements OnInit {
    
    constructor(private _router: Router,
                private _authService: AuthService,
                private _examService: ExamService,
                private _eventService: EventService) 
                {

                }

    results: any;
    
    ngOnInit() {
      if (!this._authService.premierUser()) {
        this._router.navigate(['premiumupgrade']);
        return;
      }

      this._examService.allExamScores()
            .subscribe(
          response => {
            this._handleAllExamResponse(response);
          },
          error => this._handleAllExamError(error)
        );
    }

    _handleAllExamResponse(exams: any) {
      console.log(exams);
    }

    _handleAllExamError(error: any) {
      this._eventService.broadcast('error', 'There was an issue retrieving your history');
      console.error(error);
    }
}