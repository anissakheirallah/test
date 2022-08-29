import { Team } from "./team.model";

export class User {

    id: Number;
    firstName: String;
    lastName: String;
    userName: String;
    password: String;
    language: String;
    role: String;
    teams: Team[];

    constructor(id: Number, firstName: String, lastName: String, userName: String, password: String, language: String, role: String, teams: Team[]) {
        this.id = id;
        this.firstName = firstName
        this.lastName = lastName;
        this.userName = userName;
        this.userName = userName;
        this.password = password;
        this.language = language;
        this.role = role;
        this.teams = teams;

    }
}
