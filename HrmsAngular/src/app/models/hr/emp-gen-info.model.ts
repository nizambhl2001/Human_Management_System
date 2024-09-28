import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class EmpGenInfo{
    id : number=0;
    empCode : string;
    empName : string;
    lastName : string;
    shortName : string;
    fName : string;
    fatherOccupation : number;
    mName : string;
    motherOccupation : number;
    wifeName : string;
    email : string;
    nationality : number=0;
    weight : string;
    height : string;
    gender : number=0;
    dob : string;
    dobNgb : NgbDateStruct;
    nationalId : string;
    tinNo : string;
    religion : number=0;
    meritalStatus : number=-1;
    pasportNo : string;
    bloodGroup : number=0;
    remarks : string;
    companyID : number;
    gradeValue : number;
    gradeId : number=0;
    status : number;
    originalBirthDate : string;
    originalBirthDateNgb : NgbDateStruct;
    age:string;
    cardID : number;
    active : number;
    picture : any;
    pictureFile : File;
    signature : any;
    signatureFile : File;
    passportExpairedDate : string;
    passportExpairedDateNgb : NgbDateStruct;
    title : number=0;
    suffix : number=0;
    child : number=0;
    passportIssueDate : string;
    passportIssueDateNgb : NgbDateStruct;
}