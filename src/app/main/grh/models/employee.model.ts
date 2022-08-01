import { RhRequest } from "./rh-request.model";

export class Employee {
    id: number;
    firstName: String;
    lastName: String;
    email: String;
    requests: RhRequest[];

    constructor(firstName: String, lastName: String, email: String, requests: RhRequest[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.requests = requests
    }
}
