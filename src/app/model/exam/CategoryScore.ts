export class CategoryScore {
    constructor() {}

    public name: string;
    public id: string;
    get data(): any[] {
        return [this.correct, this.total - this.correct];
    }
    public correct: number;
    public total: number;
}