import { AnswerInterface } from './../../interface/Answer.interface';

export class QuestionResponse implements AnswerInterface {
    constructor() {}

    questionid: string;
    sectionid: string;
    response: any[];
    responses: any[];
}