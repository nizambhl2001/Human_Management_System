import { OtherAllowanceDetails } from './other-selected-item.model';

export class OtherAllowance {
    id   :number;
    payscaleDeails:OtherAllowanceDetails[];
    payscaleID  :number;
    salaryHeadID  :number;
     amount  :number;
    sortOrder  :number;
    companyID  :number;  
     selectedAmount: number[]; 
   
    
}
