import {Component} from 'angular2/core';
import {MultipleChoiceQuestion} from './../../model/question/MultipleChoiceQuestion';
import {MCQuestionDirective} from './../../directives/MCQuestionDirective';
 
@Component({ 
    selector: 'multipleChoice', 
    template: [require('./multipleChoice.html')],
    styles: [require('./multipleChoice.css')],
    directives: [MCQuestionDirective]
})
export class MultipleChoiceComponent {
    
    constructor() {
        
    }
    
    //TODO:  get and set data from MCQuestionDirective question attribute
}