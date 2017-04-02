import { Injectable } from '@angular/core';
import { Category } from './../model/Category';

@Injectable()
export class SessionService {
  constructor() { }

  private static selectedCategories: Category[];
  private static allCategories: Category[];

  public getCategories() {
    return SessionService.selectedCategories;
  }

  public setCategories(categories: any) {
    SessionService.selectedCategories = categories.cats;
  }

  public getAllCategories() {
    return SessionService.allCategories;
  }

  public setAllCategories(categories: any) {
    SessionService.allCategories = categories;
  }
}