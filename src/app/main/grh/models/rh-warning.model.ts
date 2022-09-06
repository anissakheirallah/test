export class RhWarning {
  id: number;
  employee_id: number;
  warningType_id: number;
  messageDetail: String;

  constructor(
    employee_id: number,
    warningType_id: number,
    messageDetail: String
  ) {
    this.employee_id = employee_id;
    this.warningType_id = warningType_id;
    this.messageDetail = messageDetail;
  }
}
