import { YoungestAgeFromCurrent } from './../model/Constants';
import { YearsAvailable } from './../model/Constants';
import { Injectable } from '@angular/core';

@Injectable()
export class YearService {
    constructor() {}
    
    years() {
        var list : string[]= [];
        var currentDate: Date = new Date();
        var currentYear = currentDate.getFullYear() - YoungestAgeFromCurrent;
        
        for (var i = 1; i < YearsAvailable; i++) {
            list.push((currentYear - i).toString());
        }
        
        return list;
    }
}