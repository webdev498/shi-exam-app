import {Exam} from './../model/exam/Exam';
import {Section} from './../model/exam/Section';
import {ExamResponse} from './../model/exam/ExamResponse';
import {ExamResponse as ExamResponseConstant, CurrentExam, MatchingQuestionType, MultipleChoiceQuestionType, GroupingQuestionType} from './../model/Constants';
import {Score} from './../model/exam/Score';

import {Injectable} from '@angular/core';
var _ = require('lodash');

@Injectable()
export class ExamResponseService {
    constructor() {}

    examResults():Score {
        let er = <ExamResponse>JSON.parse(sessionStorage[ExamResponseConstant]);
        let exam = <Exam>JSON.parse(sessionStorage[CurrentExam]);
        let score = new Score();

        score.overallScore = 'Your scored ' + er.pointsAwarded.toString() + ' out of a possible ' + er.pointsPossible.toString() + ' correct answers';

        for (let section of er.sections) {
            //find the matching section in the exam
            let examSection = _.filter(exam.sections, function(o) {
                                return _.equals(o.id, section.id);
                            })[0];

            let percentCorrect = 0;

            switch (examSection.type) {
                case MultipleChoiceQuestionType:
                    score.mcScore = examSection.correct.toString() + ' out of ' + examSection.possible.toString();
                    percentCorrect = Math.floor((examSection.correct / examSection.possible) * 100);
                    score.mcPercent = percentCorrect.toString() + '%';
                    score.mcPassed = percentCorrect < 70 ? false : true;
                break;
                case MatchingQuestionType:
                    score.matchingScore = examSection.correct.toString() + ' out of ' + examSection.possible.toString();
                    percentCorrect = Math.floor((examSection.correct / examSection.possible) * 100);
                    score.matchingPercent = percentCorrect.toString() + '%';
                    score.matchingPassed = percentCorrect < 70 ? false : true;
                break;
                case GroupingQuestionType:
                    score.groupingScore = examSection.correct.toString() + ' out of ' + examSection.possible.toString();
                    percentCorrect = Math.floor((examSection.correct / examSection.possible) * 100);
                    score.groupingPercent = percentCorrect.toString() + '%';
                    score.groupingPassed = percentCorrect < 70 ? false : true;
                break;
            }
        }

        return score;
    }
}