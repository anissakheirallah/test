export class RhRequest {
    id: number;
    datetime: Date;
    employee_id: Number;

    constructor(datetime: Date, employee_id: Number) {
        this.datetime = datetime;
        this.employee_id = employee_id;
    }
}
