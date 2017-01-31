import {Component} from '@angular/core';
import {CategoriesComponent} from './category/categories.component';

@Component({
  selector: 'study',  
  styles: [ require('./study.less') ],
  template: require('./study.html'),
})
export class StudyComponent {
    
    constructor() {}

    selected(categories: any) {
      console.log(categories);
    }   
}