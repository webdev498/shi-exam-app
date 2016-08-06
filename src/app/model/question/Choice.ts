import { ChoiceInterface } from './../interface/Choice.interface';

export class Choice implements ChoiceInterface {
    public selected: boolean = false;
    public text: string;
    public id: string;

    constructor(text: string, id: string)
     {
         this.text = text;
         this.id = id;
     }
                
}