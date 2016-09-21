import {Question} from './Question';
import {English} from './English';
import {Spanish} from './Spanish';
import {Term} from './Term';
import {Section} from './../exam/Section';
import {QuestionInterface} from './../interface/Question.interface';

export class MatchingQuestion implements QuestionInterface{
    public question: Question;
    public english: English[];
    public spanish: Spanish[];
    public terms: Term[];
    public type: string;
    public id: string;
    public text: string;
    public section: Section;
    
    constructor() {}
    
}