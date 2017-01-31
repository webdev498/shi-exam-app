import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CategoryService} from './../../services/category.service';
import {EventService} from './../../services/event.service';
import {Category} from './../../model/Category';
var _ = require('lodash');

@Component({
  selector: 'categories',
  styles: [require('./categories.less')],
  providers: [CategoryService, EventService],
  template: require('./categories.html')
})
export class CategoriesComponent implements OnInit {
  constructor(private _categoryService: CategoryService,
              private _eventService: EventService) {}

    categories: Category[] = new Array();
    ids: string[] = new Array();
    searchtext: string;

     @Output() categoriesChosen = new EventEmitter();

    ngOnInit() {
      this._categoryService.categories()
      .subscribe(
          response => {this.categories = response},
          error => this._handleError(error, 'There was an error retrieving the categories')
      );
    }

    searchChanged() {

    }

    submit() {
        this.categoriesChosen.emit({
            ids: this.ids,
        });
    }

   _handleError(error, message) {
    this._eventService.broadcast('error', message);
    console.error(error);
  }
}
