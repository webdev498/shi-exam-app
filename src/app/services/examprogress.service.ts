import {ExamProgress} from './../model/Constants';
import {Exam} from './../model/exam/Exam';
import {ExamCompleteComponent} from './../exam/examcomplete.component';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {QuestionInterface} from './../model/interface/Question.interface';
import {MultipleChoiceQuestionType, MatchingQuestionType, GroupingQuestionType} from './../model/Constants';

@Injectable()
export class ExamProgressService {
    answers: any[];
    exam: Exam;
    questionsComplete: number = 0;

    constructor(private _router: Router) {
        this.answers = new Array();
    }

    continue() {
        this.answers = this.getProgress();
    }

    setCurrentExam(exam: Exam) {
        this.exam = exam;
    }

    nextQuestion() :QuestionInterface {
        return this.exam.questions[this.questionsComplete];
    }

    isLastQuestion() {
        return this.exam.questions.length - 1 === this.questionsComplete;
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
            this._router.navigate(['examcomplete']);
            let examDTO = {examid: this.exam.id, time: null, answers: this.answers}
            console.log(JSON.stringify(examDTO));
            return false;
        }

        return true;
    }

    getProgress() {
        if (sessionStorage[ExamProgress] != null)
            return JSON.parse(sessionStorage.getItem(ExamProgress));
        else
            return null;
    }
    
}