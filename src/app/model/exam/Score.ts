export class Score {
    constructor() {}

    public overallScore: string;
    public mcScore: string;
    public groupingScore: string;
    public matchingScore: string;
    public categoriesScore: any[];

    public overallPercent: string;
    public mcPercent: string;
    public matchingPercent: string;
    public groupingPercent: string;

    public overallPassed: boolean;
    public mcPassed: boolean;
    public matchingPassed: boolean;
    public groupingPassed: boolean;

    public overallMessage: string;
}