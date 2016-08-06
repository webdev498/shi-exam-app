import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Choice} from './../../model/question/Choice';
 
@Component({ 
    selector: 'multipleChoice', 
    template: require('./multiplechoice.html'),
    styles: [require('./multiplechoice.less')]
})
export class MultipleChoice {
    @Input() choices : Choice[];
    @Output() answerChosen = new EventEmitter();
    
    constructor() {
        
    }    
    
    answer(choice: Choice) {
        this.answerChosen.emit({
            id: choice.id
        })
    }
}