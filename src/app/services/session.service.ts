import { Injectable } from '@angular/core';
import { Category } from './../model/Category';

@Injectable()
export class SessionService {
  constructor() { }

  private selectedCategories: Category[];

  public getCategories() {
    return this.selectedCategories;
  }

  public setCategories(categories: Category[]) {
    this.selectedCategories = categories;
  }
}