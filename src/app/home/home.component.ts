import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService as CGIAuth} from './../services/auth.service';
import {ExamService} from './../exam/exam.service';

@Component({
  selector: 'home',  // <home></home>
  styles: [ require('./home.less') ],
  providers: [ExamService],
  template: require('./home.html')
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router,
              private _cgiAuth: CGIAuth,
              private _examService: ExamService) {
      
  }

  examIconText: string;
  studyIconText: string;
  scoreIconText: string;

  ngOnInit() {
    //navigate to login screen if not logged in
    if (!this._cgiAuth.loggedIn())
      this._router.navigate(['login']);

   this.examIconText = "TAKE ANOTHER TEST";
   this.studyIconText = "PURCHASE STUDY";
   this.scoreIconText = "MOST RECENT RESULT";
  }

}
