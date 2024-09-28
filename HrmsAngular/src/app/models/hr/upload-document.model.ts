import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
export class UploadDocumentModel{
        id:number;
        empCode:string;
        name:string;
        type:string;
        data:any;
        date:string;
        dateNgb:NgbDateStruct;
        companyID:number;
        pOptions:number;
        documentTypeId:number;
        documentTypeName:string;
}
