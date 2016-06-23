import {Choice} from './Choice';
import {Question} from './Question';
import {QuestionInterface} from './../interface/Question.interface';

export class MultipleChoiceQuestion implements QuestionInterface{
    public question: Question;
    public choices: Choice[];
    public questionType: string;
    
    constructor() {}
                
}