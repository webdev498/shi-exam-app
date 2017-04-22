import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './../services/auth.service';
import {ExamService} from './../exam/exam.service';
import {ExamResponseService} from './../services/examresponse.service';
import {EventService} from './../services/event.service';
import {CategoryService} from './../services/category.service';
import {SessionService} from './../services/session.service';
import {ExamResponse} from './../model/exam/ExamResponse';
import {Category} from './../model/Category';
import {Score} from './../model/exam/Score';

@Component({
  selector: 'examhistory',  
  providers: [ExamResponseService, ExamService, CategoryService],
  template: require('./examhistory.html')
})
export class ExamHistoryComponent implements OnInit {
    
    constructor(private _router: Router,
                private _authService: AuthService,
                private _examresponseService: ExamResponseService,
                private _examService: ExamService,
                private _eventService: EventService,
                private _categoryService: CategoryService,
                private _sessionService: SessionService) 
                {

                }

    private _results: ExamResponse[];
    public loading: boolean = true;
    public scores: Score[] = new Array();

    public lineChartData:Array<any> = [{data: []}];

    public lineChartLabels:Array<any> = new Array();
    public lineChartOptions:any = {
      responsive: true,
        scales: { yAxes: [{
              ticks: {
                  min: 0,
                  max: 100,
                  stepSize: 5
              }
          }]
        }
    };

    private _categories: Category[];
    
    ngOnInit() {
      if (!this._authService.premierUser()) {
        this._router.navigate(['premiumupgrade']);
        return;
      }

      if (this._sessionService.getAllCategories() !== undefined) {
        this._categories = this._sessionService.getAllCategories();
        this._scores();
      } else {
        this._categoryService.categories()
          .subscribe(
            response => {
              this._categories = <Category[]>response;
              this._sessionService.setAllCategories(this._categories);
              this._scores();
            },
            error => this._handleAllExamError(error)
        );
      }
    }

    _scores() {
          this._examService.allExamScores()
            .subscribe(
          response => {
            this._handleAllExamResponse(response);
          },
          error => this._handleAllExamError(error)
        );
    }

    _handleAllExamResponse(examResults: ExamResponse[]) {
      this._results = examResults;
      let scoreTemp: Score[] = new Array();
      for (let result of this._results) {
        scoreTemp.push(this._examresponseService.examHistoryResult(result));
      }

      this.scores = scoreTemp;

      this.lineChartLabels = this.scores.map(label => label.dateTaken);
      const lineScores = this.scores.map(s => s.percent);
      console.log(lineScores);
      this.lineChartData = [{data: lineScores, label: 'Percent Correct'}];

      this.loading = false;
    }

    _handleAllExamError(error: any) {
      this._eventService.broadcast('error', 'There was an issue retrieving your history');
      console.error(error);
    }

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}