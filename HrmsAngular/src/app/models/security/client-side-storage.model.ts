import { Injectable } from "@angular/core";

@Injectable()
export class TempStorageData{
    public static userID:number;
    public static loginID:string;
    public static userName:string;
    public static userTypeID:number;
    public static empCode:string;
    public static empName:string;
    public static gradeValue:number;
    public static picture:any;
    public static companyID:number;
    public static token:string;
    public static isLocked:boolean;
    public static isRemembered:boolean;
}