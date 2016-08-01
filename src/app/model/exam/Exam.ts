import {QuestionInterface} from './../interface/Question.interface';
import {MultipleChoiceQuestion} from './../question/MultipleChoiceQuestion';
import {MatchingQuestion} from './../question/MatchingQuestion';
import {GroupingQuestion} from './../question/GroupingQuestion';
import {Question} from './../question/Question';

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
                case '1':
                //Multiple Choice
                    let mcq = new MultipleChoiceQuestion();
                    mcq.question = question;
                    mcq.questionType = q.type;
                    mcq.choices = q.choices;
                    this.questions.push(mcq);
                    break;
                case '2':
                //Matching
                    let mq = new MatchingQuestion();
                    mq.question = question;
                    mq.questionType = q.type;
                    mq.english = q.english;
                    mq.spanish = q.spanish;
                    this.questions.push(mq);
                    break;
                case '3':
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