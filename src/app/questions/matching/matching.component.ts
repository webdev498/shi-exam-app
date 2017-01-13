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

    checkChanged(term: Term) {
        if (term.checked) {
            //uncheck all other like language terms
            for (let i = 0; i < this.terms.length; i++) {
                if (term.language === this.terms[i].language &&
                    term.id !== this.terms[i].id) {
                    let termObject = document.getElementById(this.terms[i].id);
                    if (termObject != null)
                        (<HTMLInputElement>termObject).checked = false;
                   
                    this.terms[i].checked = false;
                }
            }
            //check if the opposite term has been checked
            for (let i = 0; i < this.terms.length; i++) {
                if (term.language !== this.terms[i].language &&
                    this.terms[i].checked) {
                    //match them up!
                    this._matched(term.id,this.terms[i].id);
                    let termObject = document.getElementById(term.id);
                    (<HTMLInputElement>termObject).checked = false;
                    term.checked = false;
                    this.terms[i].checked = false;
                    break;
                }
            }
        }
    }

    isEnglish(term: Term) {
        return term.language === 'english';
    }

    isSpanish(term: Term) {
        return term.language === 'spanish';
    }

    _getChoice(id) {
        return _.find(this.terms, {id: id});
    }
    
}