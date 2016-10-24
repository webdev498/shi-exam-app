import { AnswerInterface } from './../interface/Answer.interface';

export class ExamSubmission {
    constructor() {}

    examId : string;
    responses: [AnswerInterface];
}