import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class AdditionalDuties{
    id:number;
    empCode:string;
    payType:number;
    department:number;
    designation:number;
    schoolorOffice:number;
    responsibilities:string;
    noticeIssuedDate:string;
    noticeIssuedDateNgb:NgbDateStruct;
    effFromDate:string;
    effFromDateNgb:NgbDateStruct;
    effToDate:string;
    effToDateNgb:NgbDateStruct;
    duration:string;
    amount:number;
    remark:string;
    companyID:number;
    userID:number;
    msg:string;
    pOptions:number;
}
