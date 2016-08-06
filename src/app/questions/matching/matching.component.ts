import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Choice} from './../../model/question/Choice';
var _ = require('lodash');
 
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

    dragstart(ev, id) {
        ev.dataTransfer.setData('choice', id);
    }

    dropped(ev, id) {
        ev.preventDefault();
        let droppedid = ev.dataTransfer.getData('choice');
        this._matched(id, droppedid);
    }

    dragover(ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
    }

    _matched(id: string, droppedid: string) {
        this.choiceMatched.emit({
            id: id,
            matchedid: droppedid
        });

        let choice = <Choice>this._getChoice(id);
        let droppedChoice = <Choice>this._getChoice(droppedid);
        choice.matchedchoice = droppedChoice;
        droppedChoice.matched = true;
    }

    _getChoice(id) {
        return _.find(this.choices, {id: id});
    }
    
}