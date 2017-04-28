import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Term} from './../../model/question/Term';
import {GroupingQuestion} from './../../model/question/GroupingQuestion';
import {Category} from './../../model/question/Category';
import {GroupingTermsShown} from './../../model/Constants';
var _ = require('lodash');

@Component({ 
    selector: 'grouping', 
    template: require('./grouping.html'),
})
export class Grouping {
    @Input() terms : Term[];
    @Input() categories: Category[];
    @Input() gTerms: GroupingQuestion[];

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

    categoryCheckChanged(category: Category) {
        if (category.checked) {
            //uncheck any other categories
            for (let i = 0; i < this.categories.length; i++) {
                if (category.id !== this.categories[i].id &&
                    this.categories[i].checked) {
                        this.categories[i].checked = false;
                    }
            }       

            //check if a term is checked
            for (let i = 0; i < this.terms.length; i++) {
                if (this.terms[i].checked) {
                    let catObject = document.getElementById(category.id);
                    (<HTMLInputElement>catObject).checked = false;
                    category.checked = false;
                    this.terms[i].checked = false;
                    this._grouped(category.id, this.terms[i].id);
                    break;
                }
            }
        }
    }

    termCheckChanged(term: Term) {
        if (term.checked) {
            //uncheck any other terms
            for (let i = 0; i < this.terms.length; i++) {
                if (term.id !== this.terms[i].id &&
                    this.terms[i].checked) {
                        this.terms[i].checked = false;
                    }
            }
        
            //check if a category is checked
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].checked) {
                    let catObject = document.getElementById(this.categories[i].id);
                    (<HTMLInputElement>catObject).checked = false;
                    this.categories[i].checked = false;
                    term.checked = false;
                    this._grouped(this.categories[i].id, term.id);
                    break;
                }
            }
        }
    }

    _grouped(id: string, droppedid: string) {
        this.choiceGrouped.emit({
            id: droppedid,
            groupedid: id
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