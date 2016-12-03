import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Term} from './../../model/question/Term';
import {MultipleChoiceEnglishQuestionType} from './../../model/Constants';
 
@Component({ 
    selector: 'multipleChoice', 
    template: require('./multiplechoice.html'),
    styles: [require('./multiplechoice.less')]
})
export class MultipleChoice {
    @Input() terms : Term[];
    @Input() questionType: string;
    @Output() answerChosen = new EventEmitter();
    @Output() playAudio = new EventEmitter();
    
    constructor() {
        
    }    
    
    answer(term: Term) {
        this.answerChosen.emit({
            id: term.id
        });
    }

    answerText(term: Term) {
        this.answerChosen.emit({
            id: term.id
        });

        let radioButton = document.getElementById(term.id) as HTMLInputElement;
        radioButton.checked = true;
    }

    audio(term: Term) {
        this.playAudio.emit({
            text: term.text
        });
    }

    showAudio(term: Term):boolean {
        if (this.questionType === MultipleChoiceEnglishQuestionType)
            return false;
        
        if (term.text.toLowerCase() === 'none of the above')
            return false;

        return true;
    }
}