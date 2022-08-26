
export class RhRequestHoliday {
    id: number;
    holidayTitle: String;
    messageDetails: String;
    holidayType: String;
    startDate: Date;
    finishDate: Date;
    rhRequest_id: number;

    constructor(holidayTitle: String, messageDetails: String, holidayType: String, startDate: Date, finishDate: Date, rhRequest: number) {
        this.holidayTitle = holidayTitle;
        this.messageDetails = messageDetails;
        this.holidayType = holidayType;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.rhRequest_id = rhRequest;
    }
}
