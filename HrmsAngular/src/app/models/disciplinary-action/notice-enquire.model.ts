import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { EnquireCommitty } from "./enquirecommitty.model";

export class NoticeEnquire {

    id :number;
    noticeID :number;
    empCode  :string;
    dateOfEnquiry :Date;
    dateOfEnquireNgb:NgbDateStruct;
    dateOfNoticeIssue :Date;
    dateOfNoticeIssueNgb:NgbDateStruct;
    enquireCommitty:EnquireCommitty[];
    enqEmpCode:string;
    venue :string;
    note :string;
    empNote:string;
    userID :number;
    companyID :number;
    empName:string;
    designation:string;
    department:string;

}
