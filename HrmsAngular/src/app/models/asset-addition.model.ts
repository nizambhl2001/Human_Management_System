import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class AssetAddition{
    id:number;
    assetCatagoryId:number=0;
    assetID:number=0;
    model:string;
    serial:string;
    purchesPrice:number;
    confiruration:string;
    warrentyType:string;
    purchesate:any;
    purchesDateNg:NgbDateStruct;
    warrentydate:any;
    warrentyDateNg:NgbDateStruct;
    note:string;
    isActive:number;
    companyId:number;
}
