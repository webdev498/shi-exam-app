import { TermInterface } from './../interface/Term.interface';

export class Term implements TermInterface {
    public selected: boolean = false;
    public matchedchoice: Term;
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