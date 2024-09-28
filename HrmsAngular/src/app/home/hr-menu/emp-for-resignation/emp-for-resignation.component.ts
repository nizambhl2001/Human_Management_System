import { ApiResponse } from './../../../models/response.model';
import { Component, OnInit } from '@angular/core';
import { ResignationLettreModel } from '../../../models/hr/emp-resignation-lettre.model';
import { ResignationApproveService } from '../../../services/hr/resignation-lettre-approve.service';

@Component({
  selector: 'app-emp-for-resignation',
  templateUrl: './emp-for-resignation.component.html',
  styleUrls: ['./emp-for-resignation.component.scss']
})
export class EmpForResignationComponent implements OnInit {
  allResignationLetter: ResignationLettreModel[] = [];
  constructor(
    private resignationApproveS: ResignationApproveService
  ) { }

  ngOnInit() {
    this.getAllApproveLetterList();
  }
getAllApproveLetterList(){
this.resignationApproveS.getAllApproveLettreList().subscribe((response:ApiResponse)=>{
  if(response.status){
  this.allResignationLetter=response.result as ResignationLettreModel[];
  }
  else{
    return;
  }
})
}
}
