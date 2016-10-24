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
import {MultipleChoiceQuestionType, MatchingQuestionType, ExamResponse,
     GroupingQuestionType, ExamProgress, CurrentExam} from './../model/Constants';

import {ExamService} from './../exam/exam.service';

@Injectable()
export class ExamProgressService {
    answers: any[];
    exam: Exam;
    questionsComplete: number = 0;
    examSubmission: ExamSubmission;

    constructor(private _router: Router,
                private _examService: ExamService) {
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
        sessionStorage[CurrentExam] = this.exam;

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

    saveProgress(questionId: string, questionType: string, answer: any):boolean {
        let newAnswer = {questionId: questionId, response: null}
        switch (questionType)
        {
            case MultipleChoiceQuestionType:
                newAnswer.response = answer.id;
            break;
            case MatchingQuestionType:
                newAnswer.response = new Array();
                for (let i = 0; i < answer.length; i++) {
                    newAnswer.response.push({id: answer[i].id,
                        matchedid: answer[i].matchedid});
                }
            break;
            case GroupingQuestionType:
                newAnswer.response = new Array();
                for (let i = 0; i < answer.length; i++) {
                    newAnswer.response.push({choice: answer[i].id,
                        category: answer[i].groupedid});
                }
            break;
        }

        this.answers.push(newAnswer);
        sessionStorage.setItem(ExamProgress,JSON.stringify(this.answers));
        this.questionsComplete = this.answers.length;

        if (this.exam.questions.length === this.questionsComplete) {
            this._examService.submitExam(this.examSubmission)
                .subscribe(
                response => { 
                    sessionStorage[ExamResponse] = response;
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
    }

    getProgress() {
        if (sessionStorage[ExamProgress] != null)
            return JSON.parse(sessionStorage.getItem(ExamProgress));
        else
            return null;
    }
    
}