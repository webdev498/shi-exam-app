import {QuestionInterface} from './../interface/Question.interface';
import {MultipleChoiceQuestion} from './../question/MultipleChoiceQuestion';
import {MatchingQuestion} from './../question/MatchingQuestion';
import {GroupingQuestion} from './../question/GroupingQuestion';
import {Question} from './../question/Question';
import {Choice} from './../question/Choice';
var _ = require('lodash');

import {MultipleChoiceQuestionType, MatchingQuestionType, GroupingQuestionType} from './../Constants';

export class Exam {
    public id: string;
    public time: string;
    public questions: QuestionInterface[];
    
    constructor() {}

    mapExam(exam: any):this {
        let instance = this;

        this.id = exam.id;
        this.time = exam.time;

        this.questions = new Array();

        for (var q of exam.questions) {
            let question = new Question();
            question.id = q.id;
            question.text = q.text;

            switch (q.type) {
                case MultipleChoiceQuestionType:
                //Multiple Choice
                    let mcq = new MultipleChoiceQuestion();
                    mcq.question = question;
                    mcq.questionType = q.type;
                    mcq.choices = q.choices;
                    this.questions.push(mcq);
                    break;
                case MatchingQuestionType:
                //Matching
                    let mq = new MatchingQuestion();
                    mq.question = question;
                    mq.questionType = q.type;
                    mq.english = q.english;
                    mq.spanish = q.spanish;

                    //randomize english and spanish choices into one array
                    mq.choices = new Array();
                    for (let i = 0; i < mq.english.length; i++) {
                        mq.choices.push(new Choice(mq.english[i].text, mq.english[i].id));
                    }

                    for (let i = 0; i < mq.spanish.length; i++) {
                        mq.choices.push(new Choice(mq.spanish[i].text, mq.spanish[i].id));
                    }

                    //lodash randomize
                    mq.choices = _.shuffle(mq.choices);
                    this.questions.push(mq);
                    break;
                case GroupingQuestionType:
                //Grouping
                    let gq = new GroupingQuestion();
                    gq.question = question;
                    gq.questionType = q.type;
                    gq.categories = q.categories;
                    gq.choices = q.choices;
                    this.questions.push(gq);
                    break;
            }
        }

        return instance;
    }
}