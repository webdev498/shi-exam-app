import {Component} from '@angular/core';
import {CategoriesComponent} from './category/categories.component';
import {Router} from '@angular/router';
import {CategorySelections} from './../model/Constants';
import {Category} from './../model/Category';
import {SessionService} from './../services/session.service';

@Component({
  selector: 'study',  
  styles: [ require('./study.less') ],
  template: require('./study.html'),
})
export class StudyComponent {
    
    constructor(private _router: Router,
                private _sessionService: SessionService) {}

    selected(categories: Category[]) {
      console.log(categories);
      this._sessionService.SelectedCategories = categories;
      this._router.navigate(['studyquestionchoice']);
    }   
}