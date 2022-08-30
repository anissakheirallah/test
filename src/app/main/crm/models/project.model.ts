import { Team } from "./team.model";

export class Project {
    id: number;
    projectName: string;
    projectType: string;
    startDate: Date;
    finishDate: Date;
    teams: Team[];

    constructor(id: number, projectName: string, projectType: string, startDate: Date, finishDate: Date, teams: Team[]) {
        this.id = id;
        this.projectName = projectName;
        this.projectType = projectType;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.teams = teams;
    }
}
