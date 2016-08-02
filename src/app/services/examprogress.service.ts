import {ExamProgress} from './../model/Constants';
import {Injectable} from '@angular/core';

@Injectable()
export class ExamProgressService {
    constructor() {}

    saveProgress(response: any) {
        sessionStorage.setItem(ExamProgress,JSON.stringify(response));
    }

    getProgress() {
        return JSON.parse(sessionStorage.getItem(ExamProgress));
    }
    
}