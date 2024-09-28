import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BonusGridModel } from '../bonus-grid.model';
export class FestivalBonusModel{
  empCode:string;
  periodID:number;
  salaryHeadID:number;
  otpp:number;
  bonusType:number;
  date:any;
  dateNgb:NgbDateStruct;
  companyID:number;
  grade:number;
  depertment:string;
  depertmentID:number;
  designation:string;
  designationID:number;
  gradeID:number;
  jobType:number;
  companyid:number;
  bonusGrid:BonusGridModel[];

}
