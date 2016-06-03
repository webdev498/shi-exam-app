import { ChoiceInterface } from './../interface/Choice.interface';

export class Question implements ChoiceInterface {
    constructor(public text: string,
                public id: string) {}
                
}