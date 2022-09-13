import { Function } from "./function.model";

export class Campaign {
    id: number;
    name: string;
    description: string;
    nbPositions: number;
    closingDate: Date;
    candidacies: any[];
    functions: Function[];
    contracts: any[];
    regions: any[];

    constructor(name: string, description: string, nbPositions: number, closingDate: Date, candidacies: any[],
        functions: Function[], contracts: any[], regions: any[]) {
        this.name = name;
        this.description = description;
        this.nbPositions = nbPositions;
        this.closingDate = closingDate;
        this.candidacies = candidacies;
        this.functions = functions;
        this.contracts = contracts;
        this.regions = regions
    }
}
