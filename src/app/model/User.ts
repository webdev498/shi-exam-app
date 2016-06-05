import {UserRelations} from './dto/UserRelations';

export class User {
  constructor(public id: string,
               public firstName: string,
               public lastName: string,
               public email: string,
               public gender: string,
               public dateOfBirth: Date,
               public relations: UserRelations) { }
}