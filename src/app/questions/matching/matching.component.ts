import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Term} from './../../model/question/Term';
var _ = require('lodash');
 
@Component({ 
    selector: 'matching', 
    template: require('./matching.html'),
    styles: [require('./matching.less')]
})
export class Matching {
    @Input() terms : Term[];

    @Output() choiceMatched = new EventEmitter();
    @Output() termUndo = new EventEmitter();

    pressed: boolean = false;

    constructor() {
        
    }

    dragstart(ev, id) {
        ev.dataTransfer.setData('choice', id);
    }

    dropped(ev, id) {
        ev.preventDefault();
        let droppedid = ev.dataTransfer.getData('choice');
        this._matched(id, droppedid);
        this.pressed = false;
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

        let choice = <Term>this._getChoice(id);
        let droppedChoice = <Term>this._getChoice(droppedid);
        choice.matchedchoice = droppedChoice;
        droppedChoice.matched = true;
    }

    undo(term: Term) {
        this.termUndo.emit({
            id: term.id,
            matchedid: term.matchedchoice.id
        });

        term.matchedchoice.matched = false;
        term.matchedchoice = null;
    }

    pressdown() {
        this.pressed = true;
    }

    pressoff() {
        this.pressed = false;
    }

    isEnglish(term: Term) {
        return term.language === 'english' && !this.pressed;
    }

    isSpanish(term: Term) {
        return term.language === 'spanish' && !this.pressed;
    }

    _getChoice(id) {
        return _.find(this.terms, {id: id});
    }
    
}