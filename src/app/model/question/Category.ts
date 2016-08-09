import { ChoiceInterface } from './../interface/Choice.interface';
import { Choice } from './Choice';

export class Category implements ChoiceInterface {
    public groupedchoices: Choice[];

    constructor(public text: string,
                public id: string) {}
                
}