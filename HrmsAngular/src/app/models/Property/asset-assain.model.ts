import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class AssetAssainModel{
    id:number;
    empCode:string;
    reciveFrom:string;
    empName:string;
    department:string;
    designation:string;
    fromEmpName:string;
    fromDesignation:string;
    propertyID:number;
    modelID:number;
    model:string;
    categoryID:number;
    serial:string;
    confiruration:string;
    assainDate:any;
    assainDateNgb:NgbDateStruct;
    assainType:number;
    status:number;
    companyID:number;
    ownershipDate:any;
    ownershipDateNgb:NgbDateStruct;
}
