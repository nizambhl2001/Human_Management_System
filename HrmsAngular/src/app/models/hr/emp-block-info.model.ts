import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class EmpBlockInfoModel{
    id:number;
    empCode:string;
    empName:string;
    department:string;
    designation:string;
    isBlock:string;
    blockDate:string;
    blockDateNgb:NgbDateStruct;
    joiningDate:string;
    joiningDateNgb:NgbDateStruct;
    remark:string;
    companyID:number;
    status:string;
}
