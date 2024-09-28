import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ChallanPrepareSave } from "./challan-prepare-save.model";

export class ChallanPrepair {
    id :number;
    empCode :string;
    periodID :number;
    taxYearID :number;
    challanNo:string;
    gruopID :number;
    gLNo :string;
    companyID :number;
    paymentType :number;
    gradeValue:number;
    branch:number;
    empName:string;
    desigantion:string;
    department:string;
    details:ChallanPrepareSave[];
  
}
