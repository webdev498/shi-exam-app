import {Question} from './Question';
import {CategoryTerm} from './CategoryTerm';
import {QuestionInterface} from './../interface/Question.interface';

export class GroupingQuestion implements QuestionInterface{
    public question: Question;
    public choices: CategoryTerm[];
    public questionType: string;
                
    constructor() {}
    
}