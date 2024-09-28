import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  FormGroup } from '@angular/forms';

@Injectable()
export class CommonHelper {

  constructor() { }

  public static loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  public static percentAmount(amount: number, percent: number) {
    return (amount * percent) / 100;
  }
  public static isNullOrEmpty(value:string):boolean{
    return (!value || value=='');
  }
  public static coalesce(value:string,replaceVal:string):string{
    return value?value:replaceVal;
  }
  public static isInvalidControl(fieldName:string, frmControl:FormGroup, isSubmitted:boolean = false):boolean{
    const field = frmControl.get(fieldName);
    return (field.touched || field.dirty || isSubmitted) && field.invalid;
  }
  public static convObjToHttpParam(paramObj:any):HttpParams{
    let httpParam = new HttpParams();
    Object.keys(paramObj).forEach(key=>{
      httpParam = httpParam.set(key,paramObj[key]);
    })
    return httpParam;
  }
  public static focusNgSelect(elementId){
    var element =document.getElementById(elementId)?
    document.getElementById(elementId).firstElementChild?
    document.getElementById(elementId).firstElementChild.firstElementChild?
    document.getElementById(elementId).firstElementChild.firstElementChild.lastElementChild?
    document.getElementById(elementId).firstElementChild.firstElementChild.lastElementChild.getElementsByTagName('input'):null:null:null:null;

    if(element?element.item(0):null){
      element.item(0).focus();
    }
  }

  public static focusTextField(elementId){
    var element =document.getElementById(elementId)
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
   }
    if(element){
      element.focus();
    }
  }
  public static onSetTitleByModuleId(moduleId:number,pageId:number){
    // debugger;
    let paramObj:any={title:"",opTitle:"",typeId:0,processType:0,processTitle:"",memberLblName:""}
    switch(moduleId){
      case 26:
        switch(pageId){
          case 179:
        paramObj.opTitle="Association Payable";
        paramObj.typeId=1;
        paramObj.memberLblName="Association Member"
        break;
        case 89:
          paramObj.processTitle="Association Auto";
          paramObj.processType=1;
          paramObj.memberLblName="Association Member"
          break;
          case 190:
            paramObj.processTitle="Association Other"
            paramObj.processType=2;
            paramObj.memberLblName="Association Member"
            break;
        case 204:
        paramObj.opTitle="Association Receivable";
        paramObj.typeId=2;
        paramObj.memberLblName="Association Member"
        break;
        default:
          paramObj.title="Association";
          paramObj.memberLblName="Association Member"
      }
        break;
      case 41:
        switch(pageId){
          case 186:
        paramObj.opTitle="Tenant Payable";
        paramObj.typeId=1;
        paramObj.memberLblName="Association Member"
        break;
        case 126:
        paramObj.processTitle="Tenant Auto";
        paramObj.processType=1;
        paramObj.memberLblName="Tenant Member"
        break;
        case 187:
          paramObj.processTitle="Tenant Other"
          paramObj.processType=2;
          paramObj.memberLblName="Tenant Member"
          break;
        case 203:
        paramObj.opTitle="Tenant Receivable";
        paramObj.typeId=2;
        paramObj.memberLblName="Tenant Member"
        break;
        default:
          paramObj.title="Tenant";
          paramObj.memberLblName="Tenant Member";
      }
        break;
      case 48:
        switch(pageId){
          case 188:
        paramObj.opTitle="School Payable";
        paramObj.typeId=1;
        paramObj.memberLblName="Student";
        break;
        case 153:
          paramObj.processTitle="School Auto";
          paramObj.processType=1;
          paramObj.memberLblName="Student";
          break;
          case 155:
            paramObj.processTitle="School Auto";
            paramObj.processType=1;
            paramObj.memberLblName="Student";
            break;
          case 189:
            paramObj.processTitle="School Other"
            paramObj.processType=2;
            paramObj.memberLblName="Student";
            break;
        case 205:
        paramObj.opTitle="School Receivable";
        paramObj.typeId=2;
        paramObj.memberLblName="Student";
        break;
        default:
          paramObj.title="School";
          paramObj.memberLblName="Student"
      }
          break;
      case 37:
        switch(pageId){
          case 191:
        paramObj.opTitle="Payroll Payable";
        paramObj.typeId=1;
        paramObj.memberLblName="Employee"
        break;
        case 192:
          paramObj.processTitle="Payroll Auto";
          paramObj.processType=1;
          paramObj.memberLblName="Employee"
          break;
          case 194:
            paramObj.processTitle="Payroll Other"
            paramObj.processType=2;
            paramObj.memberLblName="Employee"
            break;
        case 206:
        paramObj.opTitle="Payroll Receivable";
        paramObj.typeId=2;
        paramObj.memberLblName="Employee"
        break;
        default:
          paramObj.title="Payroll";
          paramObj.memberLblName="Employee"
      }
      break;
          case 1:
          switch(pageId){
         case 2293:
          paramObj.title="Branch"
          break;
          default:
            paramObj.title="Human Resource";
          }
        break;

      case 46:
        paramObj.title="Website"
        break;
        case 6:
       paramObj.title="Accounting"
        break;
        case 57:
          paramObj.title="Marketing"
          break;
          case 86:
            paramObj.title="Library"
            break;
      default:
        paramObj.title="Human Resource";}
        return paramObj;
  }

  public static onSelectSubmodule(moduleId){

    let submoduleID:number;
    switch(moduleId){
      case 26:
        submoduleID=29;
        break;
      case 41:
        submoduleID=45;
        break;
      case 48:
        submoduleID=48;
          break;
      case 58:
        submoduleID=208;
        break;
      case 6:
        submoduleID=9;
        break;
        case 30:
          submoduleID=36;
          break;
      default:
        throw Error('Invalid ');}
        return submoduleID;
  }

  public static getLocalDateStr(date:Date = new Date()):string{
    return `${date. getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  }
}
