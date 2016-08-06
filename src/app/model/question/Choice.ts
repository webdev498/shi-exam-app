import { ChoiceInterface } from './../interface/Choice.interface';

export class Choice implements ChoiceInterface {
    public selected: boolean = false;
    public matchedchoice: Choice;
    public text: string;
    public id: string;
    public matched: boolean = false;

    constructor(text: string, id: string)
     {
         this.text = text;
         this.id = id;
         this.matched = false;
     }
                
}