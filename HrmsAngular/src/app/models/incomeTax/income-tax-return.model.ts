import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class IncomeTaxReturn {
    id :number;
    empCode :string;
    taxYearID :number;
    companyID :number;
    date :string;
    dateNgb:NgbDateStruct;
    userName :string;
    wealthAmount :number;
    taxableIncome :number;
    taxPaid :number;
    serialNo :string;
    remarks :string
}
