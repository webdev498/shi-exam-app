import {Question} from './Question';
import {English} from './English';
import {Spanish} from './Spanish';
import {Choice} from './Choice';
import {QuestionInterface} from './../interface/Question.interface';

export class MatchingQuestion implements QuestionInterface{
    public question: Question;
    public english: English[];
    public spanish: Spanish[];
    public choices: Choice[];
    public questionType: string;
    
    constructor() {}
    
}