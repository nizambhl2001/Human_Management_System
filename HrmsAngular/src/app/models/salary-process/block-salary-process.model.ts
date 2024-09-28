import { BlockSalaryProcessView } from "./block-salary-process-view.model";

export class BlockSalaryProcess {
    periodID :number;
    structureID  :number;
    taxYearID :number;
    periodName  :string;
    yearID  :number;
    salaryhead:number;
    employeeCode :string;
    companyID :number;
    grade  :number;
    department:string;
    empCode:string;
    empName:string;
    designation:string;
    userTypeID:number;
    blockSalaryViewModel:BlockSalaryProcessView[]
    
}
