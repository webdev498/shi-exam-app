import {QuestionInterface} from './../interface/Question.interface';

export class Exam {
    public id: string;
    public time: string;
    public questions: QuestionInterface[];
    
    constructor() {}
}