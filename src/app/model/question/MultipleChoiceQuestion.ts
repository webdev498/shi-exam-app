import {Choice} from './Choice';
import {Question} from './Question';

export class MultipleChoiceQuestion {
    constructor(public question: Question,
                public choices: Choice[]) {}
                
}