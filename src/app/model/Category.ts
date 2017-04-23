export class Category {
    public id: string;
    public name: string;
    public selected: boolean = false;
    public percent: number;
    public chartData: any[];
    public correct: number;
    public total: number;
}