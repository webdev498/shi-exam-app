import {QuestionInterface} from './../interface/Question.interface';
import {MultipleChoiceQuestion} from './../question/MultipleChoiceQuestion';
import {MatchingQuestion} from './../question/MatchingQuestion';
import {GroupingQuestion} from './../question/GroupingQuestion';
import {Question} from './../question/Question';
import {Term} from './../question/Term';
import {Section} from './Section';
var _ = require('lodash');

import {MultipleChoiceQuestionType, MatchingQuestionType, GroupingQuestionType} from './../Constants';

export class Exam {
    public id: string;
    public sections: Section[];
    public questions : QuestionInterface[];

    constructor() {}

    mapExam(exam: any):this {
        let instance = this;

        this.id = exam.id;
        this.sections = exam.sections;
        this.questions = new Array();
        //randomize the questions from the server
        //exam.questions = _.shuffle(exam.questions);

        for (var s of exam.sections) {
            for (var q of s.questions) {
                let question = new Question();
                question.id = q.id;
                question.text = q.text;

                let section = new Section();
                section.instructions = s.instructions;
                section.id = s.id;
                section.type = s.type;
    
                switch (q.type) {
                    case MultipleChoiceQuestionType:
                        let mcq = new MultipleChoiceQuestion();
                        mcq.question = question;
                        mcq.section = section;
                        mcq.type = q.type;
                        mcq.choices = _.shuffle(q.terms);
                        this.questions.push(mcq);
                        break;
                    case MatchingQuestionType:
                        let mq = new MatchingQuestion();
                        mq.question = question;
                        mq.section = section;
                        mq.type = q.type;
                        mq.english = q.candidates;
                        mq.spanish = q.terms;
    
                        //randomize english and spanish choices into one array
                        mq.terms = new Array();
                        for (let i = 0; i < mq.english.length; i++) {
                            mq.terms.push(new Term(mq.english[i].text, mq.english[i].id));
                        }
    
                        for (let i = 0; i < mq.spanish.length; i++) {
                            mq.terms.push(new Term(mq.spanish[i].text, mq.spanish[i].id));
                        }
    
                        //lodash randomize
                        mq.terms = _.shuffle(mq.terms);

                        this.questions.push(mq);
                        break;
                    case GroupingQuestionType:
                        let gq = new GroupingQuestion();
                        gq.question = question;
                        gq.section = section;
                        gq.type = q.type;
                        gq.categories = _.shuffle(q.categories);
                        gq.choices = _.shuffle(q.terms);
                        this.questions.push(gq);
                        break;
                }
            }
        }

        return instance;
    }
}