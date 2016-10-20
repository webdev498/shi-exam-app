import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Term} from './../../model/question/Choice';
import {Category} from './../../model/question/Category';
import {GroupingTermsShown} from './../../model/Constants';
var _ = require('lodash');

@Component({ 
    selector: 'grouping', 
    template: require('./grouping.html'),
    styles: [require('./grouping.less')]
})
export class Grouping {
    @Input() choices : Term[];
    @Input() categories: Category[];

    @Output() choiceGrouped = new EventEmitter();

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

    _grouped(id: string, droppedid: string) {
        this.choiceGrouped.emit({
            id: id,
            groupedid: droppedid
        });

        let choice = <Term>this._getChoice(droppedid);
        choice.matched = true;

        let category = <Category>this._getCategory(id);
        
        if (category.groupedterms == null)
            category.groupedterms = new Array();

        category.groupedterms.push(choice);
        this.grouped++;
    }

    _getChoice(id) {
        return _.find(this.choices, {id: id});
    }

    _getCategory(id) {
        return _.find(this.categories, {id: id});
    }
    
}