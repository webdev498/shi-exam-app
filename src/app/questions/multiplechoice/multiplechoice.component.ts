import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Term} from './../../model/question/Term';
import {MultipleChoiceQuestion} from './../../model/question/MultipleChoiceQuestion';
import {AppModeStudy} from './../../model/Constants';
import {SessionService} from './../../services/session.service';
import {MultipleChoiceEnglishQuestionType} from './../../model/Constants';
 
@Component({ 
    selector: 'multipleChoice', 
    template: require('./multiplechoice.html')
})
export class MultipleChoice {
    @Input() terms : Term[];
    @Input() mcTerms: MultipleChoiceQuestion[];
    @Input() questionType: string;
    @Input() mode: string;
    @Output() answerChosen = new EventEmitter();
    @Output() playAudio = new EventEmitter();

    public complete: boolean = false;
    public success: boolean = false;
    private currentQuestion: MultipleChoiceQuestion;

    public enableFeedback: boolean = false;
    public feedbackSubmitted: boolean = false;
    
    constructor(private _sessionService: SessionService) {
        
    }    
    
    answer(term: Term) {

        if (this.mode !== AppModeStudy) {
            this.answerChosen.emit({
                id: term.id
            });
        } else if (this.mode === AppModeStudy) {
            if (term.id === this.currentQuestion.correctId) {
                this.success = true;
            }

            this.complete = true;
        }
    }

    answerText(term: Term) {
        if (this.mode !== AppModeStudy) {
            this.answerChosen.emit({
                id: term.id
            });
        }

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

    next() {
        this.complete = false;
        this.success = false;
        this.enableFeedback = false;
        this.feedbackSubmitted = false;
    }

    showAnswer() {
        return this.complete && !this.success;
    }
}