import { RhRequest } from "./rh-request.model";

export class RhRequestHolidayResponse {
    id: number;
    holidayTitle: String;
    messageDetails: String;
    holidayType: String;
    startDate: Date;
    finishDate: Date;
    rhRequestResponse: RhRequest;

    constructor(holidayTitle: String, messageDetails: String, holidayType: String, startDate: Date, finishDate: Date, rhRequest: RhRequest) {
        this.holidayTitle = holidayTitle;
        this.messageDetails = messageDetails;
        this.holidayType = holidayType;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.rhRequestResponse = rhRequest;
    }
}
