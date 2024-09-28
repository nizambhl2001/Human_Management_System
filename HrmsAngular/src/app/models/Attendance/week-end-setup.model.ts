export class WeekEndSetup {
    id:number;
    empCode:string;
    weekEndDay:string;
    sysDate:Date;
    userID:number;
    companyID:number;
    departmentID: number;
    designationID:number;
    branchID:number;
    locationID:number;
    empName:string;
    designation:string;
    department:string;
   
    weekEndFormArray:WeekEndSetupFormList[];
    
}

export class WeekEndSetupFormList{
    empName:string;
    designation:string;
    department:string;
    weekEndDay:string;
    
}
