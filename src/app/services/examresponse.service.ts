import {Exam} from './../model/exam/Exam';
import {ExamResponse} from './../model/exam/ExamResponse';
import {ExamResponse as ExamResponseConstant} from './../model/Constants';
import {Score} from './../model/exam/Score';

import {Injectable} from '@angular/core';
var _ = require('lodash');

@Injectable()
export class ExamResponseService {
    constructor() {}

    examResults():Score {
        let er = <ExamResponse>JSON.parse(sessionStorage[ExamResponseConstant]);
        let score = new Score();

        return score;
    }
}