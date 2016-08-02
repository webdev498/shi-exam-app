import {Choice} from './Choice';
import {Question} from './Question';
import {QuestionInterface} from './../interface/Question.interface';

export class MultipleChoiceQuestion implements QuestionInterface {
    public choices: Choice[];
    public question: Question;
    public questionType: string;
    
    constructor() {}
                
}