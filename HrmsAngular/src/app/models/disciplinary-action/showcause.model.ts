import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Showcause {
id:number;
empCode:string;
type:number;
startDate?:Date;
startDateNgb?:NgbDateStruct;
endDate?:Date;
endDateNgb?:NgbDateStruct;
showcaseDate:Date;
showcaseDateNgb:NgbDateStruct;
action:number;
userID:number;
companyID:number;
remarks:string;
}
