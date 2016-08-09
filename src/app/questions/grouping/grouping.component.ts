import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Choice} from './../../model/question/Choice';
import {Category} from './../../model/question/Category';
var _ = require('lodash');

@Component({ 
    selector: 'grouping', 
    template: require('./grouping.html'),
    styles: [require('./grouping.less')]
})
export class Grouping {
    @Input() choices : Choice[];
    @Input() categories: Category[];

    @Output() choiceMatched = new EventEmitter();
    
    constructor() {}

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

    }

    _getChoice(id) {
        return _.find(this.choices, {id: id});
    }

    _getCategory(id) {
        return _.find(this.categories, {id: id});
    }
    
}