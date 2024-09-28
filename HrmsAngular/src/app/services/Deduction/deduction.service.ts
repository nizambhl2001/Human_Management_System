import { AllDeduction } from '../../models/Deduction/all-deduction.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LWPDeduct } from '../../models/Deduction/lwp-deduct.model';

@Injectable({
  providedIn: 'root'
})
export class DeductionService {

  constructor(
    private http:HttpClient
  ) { }
////////////////LoanDeduction///////////////////////
getLoan(companyID:number){
    return this.http.get(environment.apiUrl+'/loandeduct/getloan/'+companyID);
  }
getAllLoanDeduction(loandeduct:AllDeduction){  
  return this.http.post(environment.apiUrl+'/loandeduct/getall',loandeduct);
}
saveupdateLoanDeduction(loandeduct:AllDeduction){ 
  return this.http.post(environment.apiUrl+'/loandeduct/saveupdate',loandeduct)
}
//////////////////////////LWPDeduction//////////////////

getAllLWPdeduction(lwpdeduct:LWPDeduct){    
  return this.http.post(environment.apiUrl+'/lwpdeduct/getall',lwpdeduct);
  //console.log(lwpdeduct);return;
  }

  saveupdateLWPDeduction(lwpdeduct:LWPDeduct){   
    return this.http.post(environment.apiUrl+'/lwpdeduct/saveupdate',lwpdeduct)
  }

  /////////////////////////////OtherDeduction//////////////////

  
getAllOtherDeduction(otherdeduct:AllDeduction){     
  return this.http.post(environment.apiUrl+'/otherdeduct/getall',otherdeduct);
}
saveupdateOtherDeduction(otherdeduct:AllDeduction){
return this.http.post(environment.apiUrl+'/otherdeduct/saveupdate',otherdeduct)
}
/////////////////////////SalaryDeduction//////////////
getAllSalaryDeduction(saldeduct:AllDeduction){ 
  return this.http.post(environment.apiUrl+'/salarydeduct/getall',saldeduct);
}
saveupdateSalaryDeduction(saldeduct:AllDeduction){
return this.http.post(environment.apiUrl+'/salarydeduct/saveupdate',saldeduct)
}
}
