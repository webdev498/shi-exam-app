import {Component} from '@angular/core';

@Component({
  selector: 'study',  
  styles: [ require('./study.less'), require('./../app.less') ],
  template: require('./study.html')
})
export class StudyComponent {
    
    constructor() {}
    
}