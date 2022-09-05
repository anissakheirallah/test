export class Visit {
  id: number;
  datetime: Date;
  name: String;
  cin: String;
  visitPurpose: String;
  observation: String;
  employee_id: number;

  constructor(
    name: String,
    cin: String,
    visitPurpose: String,
    observation: String,
    employee_id: number
  ) {
    this.name = name;
    this.cin = cin;
    this.visitPurpose = visitPurpose;
    this.observation = observation;
    this.employee_id = employee_id;
  }
}
