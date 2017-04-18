export class CategoryScore {
    constructor() {}

    public name: string;
    public id: string;
    get data(): any[] {
        return [this.correct, parseInt(this.total) - parseInt(this.correct)];
    }
    public correct: string;
    public total: string;
}