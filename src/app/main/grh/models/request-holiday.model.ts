import { RhRequest } from "./rh-request.model";

export class RequestHoliday extends RhRequest {
  numberofdays: number;
  startDate: Date;
  finishDate: Date;
  returnDate: Date;
  numberOfPaidLeaves: number;
  numberOfUnpaidLeaves: number;

  constructor(
    city: String,
    employee_id: number,
    requeststatus_id: number,
    numberofdays: number,
    startDate: Date,
    finishDate: Date,
    returnDate: Date,
    numberOfPaidLeaves: number,
    numberOfUnpaidLeaves: number
  ) {
    super(city, employee_id, requeststatus_id);
    this.numberofdays = numberofdays;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.returnDate = returnDate;
    this.numberOfPaidLeaves = numberOfPaidLeaves;
    this.numberOfUnpaidLeaves = numberOfUnpaidLeaves;
  }
}
