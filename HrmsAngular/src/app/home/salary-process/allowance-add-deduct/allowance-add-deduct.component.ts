import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { EmploymentService } from '../../../services/hr/employment.service';
import { ApiResponse } from '../../../models/response.model';
import { Employment } from '../../../models/hr/employment.model';
import { PaysacleOutAddDeduct } from '../../../models/salary-process/paysacle-out-add-deduct.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-allowance-add-deduct',
  templateUrl: './allowance-add-deduct.component.html',
  styleUrls: ['./allowance-add-deduct.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class AllowanceAddDeductComponent extends Pagination implements OnInit {

payscaleAddDeduct:PaysacleOutAddDeduct[]=[];
payscaleAddDeductForm:FormGroup;
comId:number;
allsalaryHeadModel:SalaryHead[]=[];
btnStatus="Save";
isSubmitted = false;
userID:number;
selectedItemId: number;

  constructor(
    private empService:EmploymentService,
    private formBuilder:FormBuilder,
    private salaryHeadService:SalarySetupService,
    private sPService:SalaryProcessService,
    private dateFormator:NgbDateCustomParserFormatter,
    private toster:ToastrService,
    private modalService: NgbModal,
  ) {
    super()
   }

  ngOnInit() {
    this.items=[];
    this.update
    this.comId=AuthService.getLoggedCompanyId();
    this.CreateForm();
    this.getAllSalaryHead();
  }



  getAllSalaryHead(){
    this.salaryHeadService.getAllSalaryHead().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allsalaryHeadModel=response.result as SalaryHead[];

      }else{
        this.allsalaryHeadModel=[];
      }
    })
  }

getAddDeductList(empInfo:any){
if(empInfo==""){
  this.f.empName.patchValue("")
  this.payscaleAddDeductForm.controls['empCode'].patchValue("");
  return;
}else{
  this.f.empName.patchValue(empInfo.empName);
  this.f.empCode.patchValue(empInfo.empCode);
  this.sPService.getAddDeductList(this.f.empCode.value,this.comId).subscribe((response:ApiResponse)=>{
    if(response.status){
    this.payscaleAddDeduct= response.result as PaysacleOutAddDeduct[];
    }else{
      this.payscaleAddDeduct=[];
    }
  });
}

}




getByID(id:number, empcode:string,comid:number){
  this.btnStatus="Update";
  this.sPService.getByIdPayscale(id,empcode,comid).subscribe((response:ApiResponse)=>{
    if(response.status){
      let obj = response.result as PaysacleOutAddDeduct;
      obj.startDateNgb=this.dateFormator.stringToNgbDate(obj.startDate.toString())
      obj.endDateNgb=this.dateFormator.stringToNgbDate(obj.endDate.toString())
      this.payscaleAddDeductForm.patchValue(response.result);

    }
  });
}

deleteAllowanceAndDeduct(id: number, modal: any) {
  this.selectedItemId = id;
  this.modalService.open(modal);
}


confirmDelete(id:number){
  this.sPService.deletePayscle(this.comId,this.f.empCode.value,id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.modalService.dismissAll();
      this.Reset();

    }else{
      this.toster.error(response.result,"Failed");
    }
  });
}


saveAddOrDeduct(){

  this.isSubmitted=true;
      if(this.payscaleAddDeductForm.invalid){
        return;
          }
          else{
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var c = new Date(year + 1, month, day);
            this.f.endDate.setValue(c);
            this.f.startDate.setValue(this.dateFormator.ngbDateToDate(this.f.startDateNgb.value).toLocaleDateString());
            let obj= new PaysacleOutAddDeduct();
            obj=this.payscaleAddDeductForm.value;
            let ShType=this.allsalaryHeadModel.find(c=>c.id==this.f.salaryHeadID.value).salaryHeadType;
            console.log(ShType);
            if(ShType==="Addition"){
              obj.allowancetype=1
            }else{
              obj.allowancetype=2
            }
            console.log(obj);
            this.sPService.savePayScaleAddDeduct(obj).subscribe((response:ApiResponse)=>{
              if(response.status){
                this.toster.success(response.result,"Success");
                this.Reset();
              }
              else{
                this.toster.error(response.result,"Failed!!");
              }
            });
          }

}

updateAddOrDeduct(){
  this.btnStatus="Update";
  this.isSubmitted=true;
  if(this.payscaleAddDeductForm.invalid){
    return;
      }else{
        var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var c = new Date(year + 1, month, day);
            this.f.endDate.setValue(c);
            this.f.startDate.setValue(this.dateFormator.ngbDateToDate(this.f.startDateNgb.value).toLocaleDateString());
        let obj= new PaysacleOutAddDeduct();
        obj=this.payscaleAddDeductForm.value;
        let ShType=this.allsalaryHeadModel.find(c=>c.id==this.f.salaryHeadID.value).salaryHeadType;
            if(ShType==="Addition"){
              obj.allowancetype=1
            }else{
              obj.allowancetype=2
            }
        this.sPService.updatePayScaleDeduct(obj).subscribe((response:ApiResponse)=>{
          if(response.status){
            this.toster.success(response.result,"Success");
            this.Reset();
          }
          else{
            this.toster.error(response.result,"Failed!!");
          }
        });
      }

}

SaveOrUpdate(){
  if(this.btnStatus=="Save"){
    this.saveAddOrDeduct();
  }else{
    this.updateAddOrDeduct();
  }
}

  CreateForm(){
    this.payscaleAddDeductForm=this.formBuilder.group({
    id :[0,[]],
    empCode :[,[Validators.required]],
    salaryHeadID:[,[Validators.required]],
    amount:[,[Validators.required]],
    startDate:[,[]],
    startDateNgb:[this.dateFormator.getCurrentNgbDate(),[]],
    endDate:[,[]],
    endDateNgb:[,[]],
    allowancetype:[,[]],
    companyID:[this.comId,[]],
    empName:[,[]]
    })
  }


  get f(){
    return this.payscaleAddDeductForm.controls;
  }
  Reset(){
    this.btnStatus="Save";
    this.isSubmitted=false;
    this.payscaleAddDeductForm.reset();
    this.CreateForm();
   this.payscaleAddDeduct.length=0;

  }
}
