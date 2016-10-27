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

        for (let section of er.sections) {
            //find the matching section in the exam
            let examSection = _.filter(exam.sections, function(o) {
                                return _.equals(o.id, section.sectionId);
                            })[0];

            switch (examSection.type) {
                case MultipleChoiceQuestionType:
                
                break;
                case MatchingQuestionType:

                break;
                case GroupingQuestionType:

                break;
            }
        }

        return score;
    }
}