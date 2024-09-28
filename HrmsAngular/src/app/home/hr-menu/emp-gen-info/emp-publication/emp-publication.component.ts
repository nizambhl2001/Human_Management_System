import { AuthService } from './../../../../services/auth.service';
import { FinalSattlementService } from './../../../../services/final-sattlement/final-sattlement.service';
import { BasicEntryService } from './../../../../services/system-setup/basic-entry.service';
import { NgbDateCustomParserFormatter } from './../../../../shared/dateformat';
import { EmpPublication } from './../../../../models/hr/emp-publication.model';
import { ApiResponse } from './../../../../models/response.model';
import { EmployeeService } from './../../../../services/hr/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicEntry } from '../../../../models/system-setup/basic-entry.model';

@Component({
  selector: 'app-emp-publication',
  templateUrl: './emp-publication.component.html',
  styleUrls: ['./emp-publication.component.scss']
})
export class EmpPublicationComponent implements OnInit {
  @Input() compId:number;
  @Input() empCode:string;
  @Input() empName:string;
  constructor(
    private formBuilder:FormBuilder,
    private employeeService:EmployeeService,
    private toaster:ToastrService,
    private dateFormat:NgbDateCustomParserFormatter,
    private basicEntryService:BasicEntryService,
    private modalService:NgbModal
  ) { }
  empPublicationForm:FormGroup;
  empPublicationModel:EmpPublication[]=[];
  empChildPublicationModel:EmpPublication[]=[];
  btnStatus='Save';
  tableName:string="EmpPublication";
  isSubmitted:boolean=false;
  idForDelete:number;
  allPublication:BasicEntry[]=[];
  allDesignPublication:BasicEntry[]=[];
  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAllPublication(this.empCode);
    this.getAllChildPublication(this.empCode);
  }
  getAllPublication(empCode:string){
    if (empCode == "") { return; }
    this.employeeService.getAllPublication(this.compId,this.empCode).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.empPublicationModel=response.result as EmpPublication[];
      }
      else{
        this.empPublicationModel=[];
      }
    })
  }
  getAllChildPublication(empCode:string){
    if (empCode == "") { return; }
    this.employeeService.getAllChildPublication(this.compId,this.empCode).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.empChildPublicationModel=response.result as EmpPublication[];
      }
      else{
        this.empChildPublicationModel=[];
      }
    })
  }
  getById(rowId:number){
    let empPublication=this.empPublicationModel.find(c=>c.id==rowId);
   this.empPublicationForm.patchValue(empPublication);
      this.empPublicationForm.patchValue({
        publicationDateNgb: this.dateFormat.stringToNgbDate(empPublication.publicationDate)
     })
    this.btnStatus='Update'
}
  onSubmit(){
    this.isSubmitted = true;
    if(this.empPublicationForm.invalid){
      this.toaster.error("Fill all required field, * marked field are required!", 'Invalid Submission');
      return;
    }
    this.employeeService.saveUpdatePublication(this.empPublicationForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result ,"Success!")
        this.getAllPublication(this.empCode);
        this.getAllChildPublication(this.empCode);
        this.reset();
        this.btnStatus='Save'
      }
      else{
        this.toaster.error(response.result ,"Failed!")
      }
    })
  }
  reset(){
    this.empPublicationForm.reset();
    this.createForm();
    this.isSubmitted=false;
  }
  delete(id:number,modal:any){
    this.idForDelete=id;
    this.modalService.open(modal);
  }
  confirmRemovePublication(){
    this.basicEntryService.deleteBasicEntry(this.tableName,this.idForDelete,this.compId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.error(response.result, 'Deleted');
        this.getAllPublication(this.empCode);
        this.getAllChildPublication(this.empCode);
        this.reset();
        this.modalService.dismissAll();
      }else{
        this.toaster.error(response.result, 'Error!')
      }
    })
  }
  cancel(){
    this.modalService.dismissAll();
}
createForm(){
  this.empPublicationForm=this.formBuilder.group({
    id :[0,[]],
    empCode :[this.empCode,[]],
    publicationTitle :[,[]],
    wherePublished :[,[]],
    singleMultiple :[1,[]],
    localOrIntl :[1,[]],
    contribution :[1,[]],
    remarks :[,[]],
    publicationDate :[,[]],
    publicationDateNgb:[,[]],
    companyID :[this.compId,[]],
    publicationType :[,[]],
    url :[,[]],
    photo :[,[]],
    photoFile : [,[]],
    numberofauthor :[1,[]],
    designationId :[,[]],
    description :[,[]],
    tableName:[this.tableName,[]]
  })

}
get f(){
  return this.empPublicationForm.controls;
}
get formVal(){
  return this.empPublicationForm.value;
}

}
