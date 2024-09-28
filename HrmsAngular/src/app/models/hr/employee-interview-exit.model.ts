import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LeavingReasonModel } from "./leaving-reason.model";

export class exitInterviewModel{
  id:number;
  empCode:string
  leavingReason:LeavingReasonModel[];
  interViewer:string
  dateOfInterview:string
  dateOfInterviewNgb:NgbDateStruct
  reasonPerchentage:number
  outOfPayroll:number
}
