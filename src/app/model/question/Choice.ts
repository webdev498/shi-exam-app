import { ChoiceInterface } from './../interface/Choice.interface';

export class Choice implements ChoiceInterface {
    constructor(public text: string,
                public id: string) {}
                
}