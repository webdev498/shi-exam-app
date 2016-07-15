import {Component} from '@angular/core';
import {ExamService} from './exam.service';

@Component({
  styles: [ require('./examstart.less'), require('./../app.less') ],
  template: require('./examstart.html'),
  providers: [ExamService]
})
export class ExamStartComponent {
    
    constructor(private _examService: ExamService) {}
    

    quickTest() {

    }

    normalTest() {

    }

    longTest() {

    }
}