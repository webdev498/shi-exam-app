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

    private _allCategories: Category[] = new Array();

     @Output() categoriesChosen = new EventEmitter();

    ngOnInit() {
      this._categoryService.categories()
      .subscribe(
          response => {
            this.categories = <Category[]>_.sortBy(response, function(o) { return o.name; });
            this._allCategories = _.clone(this.categories);
          },
          error => this._handleError(error, 'There was an error retrieving the categories')
      );
    }

    searchChanged() {
      const instance = this;

      if (this.searchtext === null || this.searchtext.length == 0) {
            this.categories = _.clone(this._allCategories);
        return;
      }
      
      this.categories = _.filter(this._allCategories, function(o) {
                                return _.startsWith(o.name.toLowerCase(), 
                                    instance.searchtext.toLowerCase());
                            });
    }

    selectCategory(category: Category) {
      if (category.selected)
        category.selected = false;
      else
        category.selected = true;
    }

    submit() {
        this.categoriesChosen.emit({
            ids: this.ids,
        });
    }

    submitDisabled() {
      return false;
    }

   _handleError(error, message) {
    this._eventService.broadcast('error', message);
    console.error(error);
  }
}
