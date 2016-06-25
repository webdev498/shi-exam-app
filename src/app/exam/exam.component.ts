import {Component} from '@angular/core';

@Component({
  selector: 'exam',  
  styles: [ require('./exam.less'), require('./../app.less') ],
  template: require('./exam.html')
})
export class ExamComponent {
    
    constructor() {}
    
}