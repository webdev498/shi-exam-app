import {Component} from '@angular/core';
import {CategoriesComponent} from './category/categories.component';
import {Router} from '@angular/router';
import {CategorySelections} from './../model/Constants';
import {Category} from './../model/Category';

@Component({
  selector: 'study',  
  styles: [ require('./study.less') ],
  template: require('./study.html'),
})
export class StudyComponent {
    
    constructor(private _router: Router) {}

    selected(categories: Category[]) {
      console.log(categories);
      sessionStorage.setItem(CategorySelections,JSON.stringify(categories));

      this._router.navigate(['studyquestionchoice']);
    }   
}