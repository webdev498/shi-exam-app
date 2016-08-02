import {Component, Input} from '@angular/core';
import {Choice} from './../../model/question/Choice';
 
@Component({ 
    selector: 'multipleChoice', 
    template: require('./multiplechoice.html'),
    styles: [require('./multiplechoice.css')]
})
export class MultipleChoice {
    @Input() choices : Choice[];
    
    constructor() {
        
    }    
    
}