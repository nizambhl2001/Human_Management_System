import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class EmpCompanyTransfer {
    id:number;
    empCode:string;
    empName:string;
    preCompanyID:number;
    preDepartmentID:number;
    preProjectID:number;
    preDesignationID:number;
    preDivisionID:number;
    preBranchID:number;
    preUnit:number;
    preLocation:number;
    preGrade:number;
    prePayscaleGrade:number;
    pasCompanyID:number;
    pasDepartmentID:string;
    pasProjectID:string;
    pasDesignationID:string;
    pasDivisionID:string;
    pasBranchID:string;
    pasUnit:number;
    pasLocation:number;
    pasGrade:number;
    pasPayscaleGrade:number;
    transferDateNgb: NgbDateStruct;
    transferDate:Date;
    note:string;
    tpType:number;
    companyID:number;
    jobresponsibilities:string;
}
