import { Injectable } from '@angular/core';
import { Category } from './../model/Category';
import { User } from './../model/User';

@Injectable()
export class SessionService {
  constructor() { }

  private static allCategories: Category[];
  private static currentUser: User;
  private static selectedCategories: Category[];
  private static studyCorrect: number = 0;
  private static studyOverall: number = 0;
  private static studyRandom: boolean = false;

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

  public getStudyCorrect() :string {
    if (SessionService.studyCorrect == 0)
      return `0/${SessionService.studyOverall} (0%)`;
    else {
      const percent = Math.floor((SessionService.studyCorrect / SessionService.studyOverall) * 100);
      return `${SessionService.studyCorrect}/${SessionService.studyOverall} (${percent}%)`;
    }
  }

  public setStudyCorrect(correct: boolean, addToTotal: boolean = true):void {
    if (correct)
      SessionService.studyCorrect++;

   if (addToTotal)
     SessionService.studyOverall++;
  }

  public getStudyRandom() {
    return SessionService.studyRandom;
  }

  public setStudyRandom(random: boolean) {
    SessionService.studyRandom = random;
  }

  public getUser() : User {
    return SessionService.currentUser;
  }

  public setUser(user: User) {
    SessionService.currentUser = user;
  }
}