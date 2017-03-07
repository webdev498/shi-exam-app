import { Injectable } from '@angular/core';
import { Category } from './../model/Category';

@Injectable()
export class SessionService {
  constructor() { }

  public SelectedCategories: Category[];
}