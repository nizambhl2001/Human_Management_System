export class OtApplication {
    id :number;
    empCode :string;
    empName:string;
    designation:string;
    department:string;
    reason :string;
    otDate :string;
    otDateNgb:any;
    ddmmyy :string;
    inTime :any;
    outTime :any;
    inTimen :any;
    outTimen :any;
    otHoursApply :string;
    otHoursApprove :string;
    approveByBoss :number;
    applyToEmpcode :string;
    approveByHR :number;
    approveByHRID :number;
    entryDate :Date;
    userID :number;
    companyID :number;
    sendApprove :number=0;
    nightAllowance :string='No';
    otReason :number;
    note :string;
     msg :string;
     iterableApplication:OtApplication[];


}
