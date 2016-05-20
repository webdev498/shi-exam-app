import {KeyValueInterface} from './interface/KeyValue.interface';

export class State implements KeyValueInterface {
    public code: string;
    public name: string;
    
    constructor() {}
}