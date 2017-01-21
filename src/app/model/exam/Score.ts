export class Score {
    constructor() {}

    public overallScore: string;
    public mcScore: string;
    public mcSpanishScore: string;
    public groupingScore: string;
    public matchingScore: string;
    public categoriesScore: any[];

    public overallPercent: string;
    public mcPercent: string;
    public mcSpanishPercent: string;
    public matchingPercent: string;
    public groupingPercent: string;

    public overallPassed: boolean;
    public mcPassed: boolean;
    public mcSpanishPassed: boolean;
    public matchingPassed: boolean;
    public groupingPassed: boolean;

    public overallMessage: string;
}