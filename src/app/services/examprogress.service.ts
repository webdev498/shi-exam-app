import { GroupingResponse } from './../model/question/response/GroupingResponse';
import { MatchingResponse } from './../model/question/response/MatchingResponse';
import { MultipleChoiceResponse } from './../model/question/response/MultipleChoiceResponse';
import { QuestionResponse } from './../model/question/response/QuestionResponse';
import { ExamSubmission } from './../model/exam/ExamSubmission';

import {Exam} from './../model/exam/Exam';
import {ExamCompleteComponent} from './../exam/examcomplete.component';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {QuestionInterface} from './../model/interface/Question.interface';
import {MultipleChoiceEnglishQuestionType, MultipleChoiceSpanishQuestionType, 
     MatchingQuestionType, ExamResponse,
     GroupingQuestionType, ExamProgress, CurrentExam} from './../model/Constants';

import {ExamService} from './../exam/exam.service';
import {EventService} from './event.service';

@Injectable()
export class ExamProgressService {
    answers: QuestionResponse[];
    exam: Exam;
    questionsComplete: number = 0;
    examSubmission: ExamSubmission;

    constructor(private _router: Router,
                private _examService: ExamService,
                private _eventService: EventService) {
        this.answers = new Array();
    }

    continue() {
        this.answers = this.getProgress();
    }

    examComplete() {
        sessionStorage[ExamProgress] = null;
    }

    setCurrentExam(exam: Exam) {
        this.exam = exam;
        sessionStorage[CurrentExam] = JSON.stringify(this.exam);

        this.examSubmission = new ExamSubmission();
        this.examSubmission.examId = this.exam.id;
    }

    nextQuestion() :QuestionInterface {
        return this.exam.questions[this.questionsComplete];
    }

    isLastQuestion() {
        return this.exam.questions.length - 1 === this.questionsComplete;
    }

    progress():string {
        return 'Question ' + (this.questionsComplete + 1).toString() + ' / ' + this.exam.questions.length.toString();
    }

    saveProgress(sectionId: string, questionId: string, questionType: string, answer: any):boolean {
        let newAnswer = new QuestionResponse();
        newAnswer.questionid = questionId;
        newAnswer.sectionid = sectionId;

        switch (questionType)
        {
            case MultipleChoiceEnglishQuestionType:
            case MultipleChoiceSpanishQuestionType:
                newAnswer.response = new Array();
                newAnswer.response.push(new MultipleChoiceResponse(answer.id));
            break;
            case MatchingQuestionType:
                newAnswer.responses = new Array();
                for (let i = 0; i < answer.length; i++) {
                    newAnswer.responses.push(new MatchingResponse(answer[i].id,
                        answer[i].matchedid));
                }
            break;
            case GroupingQuestionType:
                newAnswer.responses = new Array();
                for (let i = 0; i < answer.length; i++) {
                    newAnswer.responses.push(new GroupingResponse(answer[i].groupedid,
                        answer[i].id));
                }
            break;
        }

        this.answers.push(newAnswer);
        sessionStorage.setItem(ExamProgress,JSON.stringify(this.answers));
        this.questionsComplete = this.answers.length;

        if (this.exam.questions.length === this.questionsComplete) {
            this.examSubmission.responses = this.answers;
            this._examService.submitExam(this.examSubmission)
                .subscribe(
                response => { 
                    sessionStorage[ExamResponse] = JSON.stringify(response);
                    this._router.navigate(['examcomplete']); 
                },
                error => this._handleSubmissionError(error)
            );
            return false;
        }

        return true;
    }

    _handleSubmissionError(error) {
        console.error(error);
        this._eventService.broadcast('There was an error when submitting your exam for grading');
    }

    getProgress() {
        if (sessionStorage[ExamProgress] != null)
            return JSON.parse(sessionStorage.getItem(ExamProgress));
        else
            return null;
    }
    
}