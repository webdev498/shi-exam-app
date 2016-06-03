import {Question} from './Question';
import {ChoiceTerm} from './ChoiceTerm';

export class MatchingQuestion {
    constructor(public question: Question,
                public choices: ChoiceTerm[]) 
                {}
    
}