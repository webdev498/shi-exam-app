import {Question} from './Question';
import {CategoryTerm} from './CategoryTerm';

export class GroupingQuestion {
    constructor(public question: Question,
                public choices: CategoryTerm[]) 
                {}
    
}