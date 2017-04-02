import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Category} from './../../model/Category';

@Component({
  selector: 'selection',
  styles: [require('./selection.scss')],
  providers: [],
  template: require('./selection.html')
})
export class SelectionComponent {
  constructor(private _router: Router) {}

  @Input() categories: Category[];

  resetCategories() {
    this._router.navigate(['study']);
  }

}