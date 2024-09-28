import { SalaryStructureView } from "./salary-structure-view.model";

export class EmpSalaryStructure {
     id :number;
     companyID :number;
     empID :number;
     empCode :string;
     structureID :number;
     amount :number;
    empadditionModel:SalaryStructureView[];
    empdeductionModel:SalaryStructureView[];
}
