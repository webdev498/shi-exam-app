import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Category} from './../../model/Category';

@Component({
  selector: 'selection',
  styles: [require('./selection.less')],
  providers: [],
  template: require('./selection.html')
})
export class SelectionComponent {
  constructor(private _router: Router) {}
  
  public selectedCategories: Category[];

  @Input() 
    get categories() { 
      return this.selectedCategories; 
    }

  resetCategories() {
    this._router.navigate(['study']);
  }

}