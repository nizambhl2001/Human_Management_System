import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Punishment {
id :number;
empCode  :string;
dateOfLetterIssue:Date;  
dateOfLetterIssueNgb:NgbDateStruct;
actionID :number;
natureOfPunishmentID :number;
startDate  :Date;
startDateNgb:NgbDateStruct;
endDate :Date;
endDateNgb:NgbDateStruct;
sDays :number;
userID :number;
companyID :number;
empName:string;
designation:string;
department:string;
description:string;

}
