import {Exam} from './../model/exam/Exam';
import {Section} from './../model/exam/Section';
import {ExamResponse} from './../model/exam/ExamResponse';
import {ExamResponse as ExamResponseConstant, CurrentExam, MatchingQuestionType, 
     MultipleChoiceEnglishQuestionType,MultipleChoiceSpanishQuestionType,
     GroupingQuestionType, PassingScore} from './../model/Constants';
import {Score} from './../model/exam/Score';
import {CategoryScore} from './../model/exam/CategoryScore';

import {Injectable} from '@angular/core';
var _ = require('lodash');

@Injectable()
export class ExamResponseService {
    constructor() {}

    examResults():Score {
        let er = <ExamResponse>JSON.parse(sessionStorage[ExamResponseConstant]);
        let exam = <Exam>JSON.parse(sessionStorage[CurrentExam]);
        let score = new Score();
        let percentCorrect = 0;
        const categoriesUsed = exam.categories;

        percentCorrect = Math.floor((er.pointsAwarded / (er.pointsAwarded == 0 ? 0 : er.pointsPossible)) * 100);
        score.overallScore = `You scored  ${er.pointsAwarded.toString()} out of a possible ${er.pointsPossible.toString()} correct answers (${percentCorrect.toString()}%)`;
        score.overallPassed = percentCorrect < PassingScore ? false : true;
        score.overallMessage = score.overallPassed ? 'You have a passing score!' : 'Your score did not meet the 70% passing requirement';
        score.overallRight = er.pointsAwarded;
        score.overallMissed = er.pointsPossible - er.pointsAwarded;
        score.categoriesScore = new Array();

        for (let section of er.sections) {
              for (var id in section.categoryResults) {
                  const examCategory = _.filter(categoriesUsed, { 'id': id })[0];
                  let scoreCategory = _.filter(score.categoriesScore, { 'id': id });

                  if (scoreCategory.length === 0) {
                      let cs = new CategoryScore();
                      cs.correct = section.categoryResults[id].correct;
                      cs.total = section.categoryResults[id].correct + section.categoryResults[id].incorrect;
                      cs.name = examCategory.name;
                      cs.id = id;
                      score.categoriesScore.push(cs);
                  } else {
                      scoreCategory.correct = section.categoryResults[id].correct + parseInt(scoreCategory.correct);
                      scoreCategory.total = scoreCategory.total + parseInt(section.categoryResults[id].correct) + 
                          parseInt(section.categoryResults[id].incorrect); 
                  }
              }
        }
        
        return score;
    }
}