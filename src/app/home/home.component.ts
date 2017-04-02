import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService as CGIAuth} from './../services/auth.service';
import {ExamService} from './../exam/exam.service';
import {AnalyticsService} from './../services/analytics.service';

@Component({
  selector: 'home',  
  providers: [ExamService],
  template: require('./home.html')
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router,
              private _cgiAuth: CGIAuth,
              private _examService: ExamService,
              private _analytics: AnalyticsService) {
      
  }

  examIconText: string;
  studyIconText: string;
  scoreIconText: string;
  hasLastExam: boolean = true;
  lastScore: string = "";

  ngOnInit() {
    //navigate to login screen if not logged in
    if (!this._cgiAuth.loggedIn()) {
      this._router.navigate(['login']);
      return;
    }

  this.examIconText = 'TAKE ANOTHER TEST';
   this.studyIconText = 'PURCHASE STUDY';
   this.scoreIconText = 'MOST RECENT RESULT';

   const context = this;

   this._examService.lastExamScore()
      .subscribe(
          response => {
            if (response.pointsAwarded === 0)
              context.lastScore = "0";
            else
              context.lastScore = Math.round(response.pointsAwarded / response.pointsPossible).toString();
          },
          error => this._handleLastExamError(error)
        );

   if (this._cgiAuth.premierUser()) {
     this.studyIconText = "STUDY GUIDE";
   }

   this._analytics.pageView('/home.html');
  }

  _handleLastExamError(error) {
    if (error.status == 404) {
      this.hasLastExam = false;
      this.scoreIconText = 'NO PREVIOUS RESULT';
      this.examIconText = 'TAKE A TEST';
    }
  }

  takeTest() {
    this._router.navigate(['examstart']);
  }
  
  study() {
    this._router.navigate(['study']);
  }

  mostRecent() {
    if (!this._cgiAuth.premierUser())
      this._router.navigate(['premiumupgrade']);
    else
      this._router.navigate(['examhistory']);
  }

  scoreClass(length: number) {
    return this.lastScore.length == length;
  }
}
