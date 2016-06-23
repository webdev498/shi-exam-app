import { ChoiceInterface } from './../interface/Choice.interface';

export class Category implements ChoiceInterface {
    constructor(public text: string,
                public id: string) {}
                
}