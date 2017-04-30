import {Question} from './Question';
import {Section} from './../exam/Section';
import {Term} from './Term';
import {Category} from './Category';
import {CategoryTerm} from './CategoryTerm';
import {QuestionInterface} from './../interface/Question.interface';

export class GroupingQuestion implements QuestionInterface{
    public question: Question;
    public section: Section;
    public choices: Term[];
    public categories: Category[];
    public correctResponses: any[];
    public type: string;
    public id: string;
    public text: string;
                
    constructor() {}
    
    mapPractice(practice: any):GroupingQuestion {
        let instance = this;

        return this;
    }
}