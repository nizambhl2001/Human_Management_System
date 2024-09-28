import { EarnLeaveBalanceDetails } from "./earn-leave-balance-details.model";

export class EarnLeaveBalance{
    id:number;
    lType:number;
    yearID:number;
    date:any;
    note:string;
    companyID:number;
    details:EarnLeaveBalanceDetails[];
    empCode:string;
    qty:number;
    department:string;
    designation:string;
    jobLocation:string;
    grade:number;
    executeType:number;

}

