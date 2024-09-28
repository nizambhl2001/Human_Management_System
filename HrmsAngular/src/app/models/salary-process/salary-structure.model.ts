import { SalaryView } from "./salary-view.model";
import { SalaryStructureView } from "./salary-structure-view.model";

export class SalaryStructure {
    id:number;  
    structureID :number;
    salaryHeadID :number;
    salaryHeadType :number;
    amount :number;
    salaryTypeID :number;
    basedOnID :number;
    createdDate :string;
    sortOrder :number;
    companyID:number;
    //structureView:SalaryView[];
    additionModel:SalaryStructureView[];
    deductionModel:SalaryStructureView[];

}
