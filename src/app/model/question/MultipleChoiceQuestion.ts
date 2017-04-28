import {Term} from './Term';
import {Question} from './Question';
import {Section} from './../exam/Section';
import {QuestionInterface} from './../interface/Question.interface';

export class MultipleChoiceQuestion implements QuestionInterface {
    public choices: Term[];
    public correctId: string;
    public question: Question;
    public section: Section;
    public type: string;
    public id: string;
    public text: string;
    public textTerm: string;
    
    constructor() {}
                
}