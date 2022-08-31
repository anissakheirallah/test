export class HolidayBalance {

    id: number;
    employee_id: number;
    balance: number;

    public constructor(employee_id: number, balance: number) {
        this.employee_id = employee_id;
        this.balance = balance;
    }
}
