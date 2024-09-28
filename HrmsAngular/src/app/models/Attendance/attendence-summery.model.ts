import { AttendenceSummaryView } from "./attendence-summary-view.model";

export class AttendenceSummery {
    empCode :string;
    attendenceDay :number;
    leaveWithPay :number;
    leaveWithoutPay :number;
    holiday :number;
    absent :number;
    totalDay :number;
    periodID :number;
    startDate :any
    endDate :any
    companyID :number;
    userID :number;
    remarks:string;
    depertment:number;
    project:number;
    attendenceSummaryView:AttendenceSummaryView[]
}
