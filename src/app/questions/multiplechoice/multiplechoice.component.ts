import {Component, Input} from '@angular/core';
import {Choice} from './../../model/question/Choice';
 
@Component({ 
    selector: 'multipleChoice', 
    template: require('./multipleChoice.html'),
    styles: [require('./multipleChoice.css')]
})
export class MultipleChoice {
    @Input() choices : Choice[];
    
    constructor() {
        
    }    
    
}