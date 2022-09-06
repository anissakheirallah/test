import { Employee } from "./employee.model";

export class Team {

    id:number;
    teamName:string;
	teamDesc:string;
	departement_id:number;
    employees:Array<Employee>=[];

    constructor(teamName:string,teamDesc:string){
        this.teamName=teamName;
        this.teamDesc=teamDesc;
    }
}
