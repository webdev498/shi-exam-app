import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Term} from './../../model/question/Term';
import {Category} from './../../model/question/Category';
import {GroupingTermsShown} from './../../model/Constants';
var _ = require('lodash');

@Component({ 
    selector: 'grouping', 
    template: require('./grouping.html'),
    styles: [require('./grouping.less')]
})
export class Grouping {
    @Input() terms : Term[];
    @Input() categories: Category[];

    @Output() choiceGrouped = new EventEmitter();
    @Output() termUndo = new EventEmitter();

    termsshown : number;
    grouped: number = 0;
    
    constructor() {
        this.termsshown = GroupingTermsShown;
    }

    dragstart(ev, id) {
        ev.dataTransfer.setData('choice', id);
    }

    dropped(ev, id) {
        ev.preventDefault();
        let droppedid = ev.dataTransfer.getData('choice');
        this._grouped(id, droppedid);
    }

    dragover(ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
    }

    undo(category: Category, term: Term) {
        this.termUndo.emit({
            id: category.id,
            termid: term.id
        });
        
        let index = category.groupedterms.indexOf(term,0);
        category.groupedterms.splice(index,1);
        term.matched = false;
        this.grouped--;
    }

    _grouped(id: string, droppedid: string) {
        this.choiceGrouped.emit({
            id: id,
            groupedid: droppedid
        });

        let choice = <Term>this._getChoice(droppedid);
        if (!choice.hasOwnProperty('matched')) {
            choice['matched'] = false;
        }

        choice.matched = true;

        let category = <Category>this._getCategory(id);
        
        if (category.groupedterms == null)
            category.groupedterms = new Array();

        category.groupedterms.push(choice);
        this.grouped++;
    }

    _getChoice(id) {
        return _.find(this.terms, {id: id});
    }

    _getCategory(id) {
        return _.find(this.categories, {id: id});
    }
    
}