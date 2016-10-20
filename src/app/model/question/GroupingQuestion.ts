import {Question} from './Question';
import {Section} from './../exam/Section';
import {Spanish} from './Spanish';
import {Category} from './Category';
import {CategoryTerm} from './CategoryTerm';
import {QuestionInterface} from './../interface/Question.interface';

export class GroupingQuestion implements QuestionInterface{
    public question: Question;
    public section: Section;
    public choices: Spanish[];
    public categories: Category[];
    public type: string;
    public id: string;
    public text: string;
                
    constructor() {}
    
}