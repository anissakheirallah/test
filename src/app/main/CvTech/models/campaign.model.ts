import { Postulation } from "./postulation.model";

export class Campaign {
    id: number;
    name: String;
    description: String;
    nbPositions: number;
    closing_date: Date;
    postulation: Postulation[];

    constructor(name: String, description: String, nbPositions: number, closing_date: Date, postulation: Postulation[]) {
        this.name = name;
        this.description = description;
        this.nbPositions = nbPositions;
        this.closing_date = closing_date;
        this.postulation = postulation;
    }
}
