import {Directive, Attribute} from '@angular/core';
import {MultipleChoiceQuestion} from './../model/question/MultipleChoiceQuestion';
 
@Directive({ 
    selector: '[mcquestion]'
})
export class MCQuestionDirective{
    question: MultipleChoiceQuestion;
    
    constructor(@Attribute("mcquestion")mcquestion: MultipleChoiceQuestion){
        this.question = mcquestion;
    }
}