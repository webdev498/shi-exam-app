import {Question} from './Question';
import {Spanish} from './Spanish';
import {Category} from './Category';
import {CategoryTerm} from './CategoryTerm';
import {QuestionInterface} from './../interface/Question.interface';

export class GroupingQuestion implements QuestionInterface{
    public question: Question;
    public choices: Spanish[];
    public categories: Category[];
    public questionType: string;
                
    constructor() {}
    
}