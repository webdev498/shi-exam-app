import {Exam} from './../model/exam/Exam';
import {Section} from './../model/exam/Section';
import {ExamResponse} from './../model/exam/ExamResponse';
import {ExamResponse as ExamResponseConstant, CurrentExam, MatchingQuestionType, 
     MultipleChoiceEnglishQuestionType,MultipleChoiceSpanishQuestionType,
     GroupingQuestionType, PassingScore} from './../model/Constants';
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
        let percentCorrect = 0

        score.overallScore = 'Your scored ' + er.pointsAwarded.toString() + ' out of a possible ' + er.pointsPossible.toString() + ' correct answers';
        percentCorrect = Math.floor((er.pointsAwarded / er.pointsPossible) * 100);
        score.overallPassed = percentCorrect < PassingScore ? false : true;
        score.overallMessage = score.overallPassed ? 'You have a passing score!' : 'Your score did not meet the 70% passing requirement';

        for (let section of er.sections) {
            //find the matching section in the exam
            let examSection = _.filter(exam.sections, function(o) {
                                return _.equals(o.id, section.id);
                            })[0];

            switch (examSection.type) {
                case MultipleChoiceEnglishQuestionType:
                case MultipleChoiceSpanishQuestionType:
                    score.mcScore = examSection.correct.toString() + ' out of ' + examSection.possible.toString();
                    percentCorrect = Math.floor((examSection.correct / examSection.possible) * 100);
                    score.mcPercent = percentCorrect.toString() + '%';
                    score.mcPassed = percentCorrect < PassingScore ? false : true;
                break;
                case MatchingQuestionType:
                    score.matchingScore = examSection.correct.toString() + ' out of ' + examSection.possible.toString();
                    percentCorrect = Math.floor((examSection.correct / examSection.possible) * 100);
                    score.matchingPercent = percentCorrect.toString() + '%';
                    score.matchingPassed = percentCorrect < PassingScore ? false : true;
                break;
                case GroupingQuestionType:
                    score.groupingScore = examSection.correct.toString() + ' out of ' + examSection.possible.toString();
                    percentCorrect = Math.floor((examSection.correct / examSection.possible) * 100);
                    score.groupingPercent = percentCorrect.toString() + '%';
                    score.groupingPassed = percentCorrect < PassingScore ? false : true;
                break;
            }
        }

        return score;
    }
}