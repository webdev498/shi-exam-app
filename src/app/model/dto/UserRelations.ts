import {Address} from './../Address';
import {Telephone} from './../Telephone';
import {Nationality} from './../Nationality';

export class UserRelations {
    public address: Address[];
    public telephones: Telephone[];
    public nationality: Nationality;
    
    constructor() {}
}