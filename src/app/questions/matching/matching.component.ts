import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Choice} from './../../model/question/Choice';
 
@Component({ 
    selector: 'matching', 
    template: require('./matching.html'),
    styles: [require('./matching.less')]
})
export class Matching {
    @Input() choices : Choice[];
    @Output() choiceMatched = new EventEmitter();

    constructor() {
        
    }

    matched(choice: Choice) {
        this.choiceMatched.emit({
            id: choice.id
        })
    }
    
}