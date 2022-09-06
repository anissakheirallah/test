export abstract class RhRequest {
  id: number;
  requestDate: Date;
  city: String;
  employee_id: number;
  requeststatus_id: number;

  constructor(city: String, employee_id: number, requeststatus_id: number) {
    this.city = city;
    this.employee_id = employee_id;
    this.requeststatus_id = requeststatus_id;
  }
}
