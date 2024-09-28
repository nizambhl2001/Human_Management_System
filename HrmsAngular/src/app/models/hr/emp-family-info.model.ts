import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class EmpFamilyInfo {
    id: number;
    empCode: string;
    personName: string;
    dob: string;
    dobNgb: any;
    pob: string='0';
    districtName:string;
    bloodGroup: number=0;
    relationship: string;
    gender: number=0;
    maritalStatus: number=-1;
    contactNo: string;
    email: string;
    nationality: string;
    isNominee: string='No';
    percentage: number;
    occupation: string;
    passportNo: string;
    nationalID: string;
    companyId: number;
    photo: any;
    signature:any;
    genderName: string;
    usedPer: number;
    unusedPer: number;
    nomineeCount: number;
    bloodGroupName: string;
    maritalStatusName: string;
}
