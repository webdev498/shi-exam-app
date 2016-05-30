import {Component, Input} from '@angular/core';
import {MultipleChoiceQuestion} from './../../model/question/MultipleChoiceQuestion';
 
@Component({ 
    selector: 'multipleChoice', 
    template: require('./multipleChoice.html'),
    styles: [require('./multipleChoice.css')]
})
export class MultipleChoiceComponent {
    @Input() model : MultipleChoiceQuestion;
    
    constructor() {
        
    }    
    
}