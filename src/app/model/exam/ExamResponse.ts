import {SectionResponse} from './SectionResponse';

export class ExamResponse {
    constructor() {}

    id: string;
    examId: string;
    itemCount: number;
    pointsPossible: number;
    pointsAwarded: number;
    sections: SectionResponse[];
}