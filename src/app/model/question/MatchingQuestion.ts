import {Question} from './Question';
import {ChoiceTerm} from './ChoiceTerm';
import {QuestionInterface} from './../interface/Question.interface';

export class MatchingQuestion implements QuestionInterface{
    public question: Question;
    public choices: ChoiceTerm[];
    public questionType: string;
    
    constructor() {}
    
}