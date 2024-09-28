import { EmployeeExtraSalaryView } from "./employee-extra-salary-view.model";

export class EmployeeExtraSalary {
        empCode:string;
        periodID:number;
        bonustypeID:number;
        gradeValue:number;
        companyID:number;
        empExtraSalary:EmployeeExtraSalaryView[];
}
