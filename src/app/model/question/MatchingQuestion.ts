import {Question} from './Question';
import {English} from './English';
import {Spanish} from './Spanish';
import {QuestionInterface} from './../interface/Question.interface';

export class MatchingQuestion implements QuestionInterface{
    public question: Question;
    public english: English[];
    public spanish: Spanish[];
    public questionType: string;
    
    constructor() {}
    
}