import {Month} from './../model/Month';

export class MonthService {
    
    constructor() {
  
    }
    
    months() {
        var list: Month[] = [];
       list.push({
           name: 'January',
           index: 1 
        });
       list.push({
           name: 'February',
           index: 2 
        });
       list.push({
           name: 'March',
           index: 3 
        });
        list.push({
           name: 'April',
           index: 4 
        });
       list.push({
           name: 'May',
           index: 5 
        });
        list.push({
           name: 'June',
           index: 6 
        });
        list.push({
           name: 'July',
           index: 7 
        });
        list.push({
           name: 'August',
           index: 8 
        });
        list.push({
           name: 'September',
           index: 9 
        });
        list.push({
           name: 'October',
           index: 10 
        });
        list.push({
           name: 'November',
           index: 11 
        });
        list.push({
           name: 'December',
           index: 12
        });
        
        return list;
    }
}