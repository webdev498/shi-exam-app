import {ExamProgress} from './../model/Constants';
import {Exam} from './../model/exam/Exam';
import {Injectable} from '@angular/core';
import {QuestionInterface} from './../model/interface/Question.interface';
import {MultipleChoiceQuestionType, MatchingQuestionType, GroupingQuestionType} from './../model/Constants';

@Injectable()
export class ExamProgressService {
    answers: any[];
    exam: Exam;
    questionsComplete: number = 0;

    constructor() {
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

    saveProgress(questionId: string, questionType: string, answer: any) {
        let newAnswer = {questionId: questionId, response: {}}
        switch (questionType)
        {
            case MultipleChoiceQuestionType:
                newAnswer.response = answer.id;
            break;
            case MatchingQuestionType:
                newAnswer.response = [];
                for (let i = 0; i < answer.matches.length; i++) {
                    answer.matches.push({english: answer.matches[i].english,
                        spanish: answer.matches[i].spanish});
                }
            break;
            case GroupingQuestionType:
                newAnswer.response = [];
                for (let i = 0; i < answer.matches.length; i++) {
                    answer.matches.push({choice: answer.matches[i].choice,
                        category: answer.matches[i].category});
                }
            break;
        }

        this.answers.push(newAnswer);
        sessionStorage.setItem(ExamProgress,JSON.stringify(this.answers));
        this.questionsComplete = this.answers.length;
    }

    getProgress() {
        if (sessionStorage[ExamProgress] != null)
            return JSON.parse(sessionStorage.getItem(ExamProgress));
        else
            return null;
    }
    
}