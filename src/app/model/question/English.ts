import { ChoiceInterface } from './../interface/Choice.interface';

export class English implements ChoiceInterface {
    constructor(public text: string,
                public id: string) {}
                
}