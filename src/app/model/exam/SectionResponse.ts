import {QuestionResponse} from './QuestionResponse';

export class SectionResponse {
    constructor() {}

    id: string;
    items: number;
    possible: number;
    correct: number;
    results: QuestionResponse[];
    categoryResults: any;
}