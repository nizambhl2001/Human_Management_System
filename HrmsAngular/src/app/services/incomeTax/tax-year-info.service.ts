import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TaxYearInfo } from '../../models/incomeTax/tax-year-info.model';
import { environment } from '../../../environments/environment';
import { SlabIncomeTax } from '../../models/incomeTax/slab-income-tax.model';
import { IncomeTaxSetup } from '../../models/incomeTax/income-tax-setup.model';
import { TaxMinimumTax } from '../../models/incomeTax/tax-minimum-tax.model';
import { SearchChargeSetup } from '../../models/incomeTax/search-charge-setup.model';
import { SearchargeAssain } from '../../models/incomeTax/searcharge-assain.model';
import { AdditionalTaxInfo } from '../../models/incomeTax/additional-tax-info.model';
import { TaxAdvance } from '../../models/incomeTax/tax-advance.model';
import { TaxChallan } from '../../models/incomeTax/tax-challan.model';
import { ProcessIncomeTaxParameter } from '../../models/incomeTax/process-income-tax-parameter.model';
import { ChallanPrepair } from '../../models/incomeTax/challan-prepair.model';
import { IncomeTaxReturn } from '../../models/incomeTax/income-tax-return.model';
import { ChallanNumberAssaign } from '../../models/incomeTax/challan-number-assaign.model';
import { TaxCalculation } from '../../models/incomeTax/tax-calculation.model';
import { TaxCardModel } from '../../models/incomeTax/tax-card.model';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaxYearInfoService {

  constructor(
    private http:HttpClient
  ) { }


  saveTaxYearInfo(taxYearInfo:TaxYearInfo){
    return this.http.post(environment.apiUrl+'/incometax/taxyearinfo/save',taxYearInfo);

  }

  getAllYearList(){
    return this.http.get(environment.apiUrl+'/incometax/taxyearinfo/getall');
  }

getByID(id:number){
  return this.http.get(environment.apiUrl+'/incometax/taxyearinfo/getbyid/'+id)
}


//==============================SlabIncome Tax===================================

getAllSlabType(){
  return this.http.get(environment.apiUrl+'/incometax/slabincometax/getallslab');
}

saveSlabeIncomeTax(slabIncomeTax:SlabIncomeTax){
  return this.http.post(environment.apiUrl+'/incometax/slabincometax/save',slabIncomeTax)

}

getAllSlabIncomeBySlabId(id:number,taxYearID:number){
  return this.http.get(environment.apiUrl+'/incometax/slabincometax/getallslabincomeById/'+id+'/taxYearID/'+taxYearID);
}

getAllSlabIncomeByTaxYearID(id:number,slabTypeID:number){
  return this.http.get(environment.apiUrl+'/incometax/slabincometax/slabincomeBytaxyearid/'+id+'/slabTypeID/'+slabTypeID);
}


getBySlabIncomeid(id:number){
return this.http.get(environment.apiUrl+'/incometax/slabincometax/getbyid/'+id);
}


//==================================== IncomeTAX Setup=========================

getAllIncomeTaxSetup(id:number){
  return this.http.get(environment.apiUrl+'/incometax/incometaxsetup/getall/'+id);
}

saveSetup(incomeTaxSetup:IncomeTaxSetup){

  return this.http.post(environment.apiUrl+'/incometax/incometaxsetup/save',incomeTaxSetup)
}

getIncomeTaxByID(id:number){
  return this.http.get(environment.apiUrl+'/incometax/incometaxsetup/getbyid/'+id);
}


//============================Minimum Tax Setup===========================

getMinimumTaxListByID(id:number){
  return this.http.get(environment.apiUrl+'/incometax/minimumtax/getall/'+id);
}

getMinimumTaxByID(id:number){
  return this.http.get(environment.apiUrl+'/incometax/minimumtax/getbyid/'+id);
}


saveMinimumTax(taxMinimumModel:TaxMinimumTax){
  return this.http.post(environment.apiUrl+'/incometax/saveminimumtax/save',taxMinimumModel);
}


//=====================================Search Charge Setup=========================

getAllSearchChargeList(id:number){
  return this.http.get(environment.apiUrl+'/incometax/searchcharge/getall/'+id)
}

getSerChargeByID(id:number){
  return this.http.get(environment.apiUrl+'/incometax/searchcharge/getbyid/'+id);
}

saveUpdateSercharge(serchModel:SearchChargeSetup){
  return this.http.post(environment.apiUrl+'/incometax/searchcharge/saveupdate',serchModel);
}

//=================================SearCharge Assaign================================

saveUpdateSerchargeAssaign(seAssaign:SearchargeAssain){
  return this.http.post(environment.apiUrl+'/incometax/searchchargeassaign/saveupdate',seAssaign)
}

getPersentageList(id:number){
  return this.http.get(environment.apiUrl+'/incometax/searchchargeassaign/getPersentage/'+id)
}

getSearchargeAssaignList(empCode:string,comID:number){
  return this.http.get(environment.apiUrl+`/incometax/searchchargeassaign/list/empcode/${empCode}/comid/${comID}`);
}

getSearchargeAssignByID(id:number){
  return this.http.get(environment.apiUrl+`/incometax/searchchargeassaign/getbyid/${id}`);
}
//===================================Additional Tax Info==============================
saveAdditionalTaxInfo(additionaltaxinfo:AdditionalTaxInfo){
  return this.http.post(environment.apiUrl+'/incometax/additionaltaxinfo/save',additionaltaxinfo)
}


getAdditionalTaxInfoLis(comid:number){
  return this.http.get(environment.apiUrl+`/incometax/addtionaltaxinfolist/comid/${comid}`)
}


getAddtionalTaxInfoById(id:number){
return this.http.get(environment.apiUrl+`/incometax/addtionaltaxinfobyid/id/${id}`);
}


deleteAdditionalTaxInfo(id:number){
  return this.http.delete(environment.apiUrl+`/incometax/deleteadditionaltaxinfo/id/${id}`)
}

//===================================Tax Paid Out Of PayRoll==========================

saveAdvancePaidPayRoll(taxAdvance:TaxAdvance){
  return this.http.post(environment.apiUrl+'/incometax/taxadvance/save',taxAdvance)
}


//=================================Process Income Tax======================================

getAllName_EmpCode(){
  return this.http.get(environment.apiUrl+'/incometax/processincometax/allname_code');
}

// PreProcess Income Tax
preProcessTax(preProcessIncomeTax:ProcessIncomeTaxParameter){
  return this.http.post(environment.apiUrl+'/incomeTax/preProcess',preProcessIncomeTax);
}

// Process Income Tax
processIncomeTax(processIncomeTax:ProcessIncomeTaxParameter){
  return this.http.post(environment.apiUrl+`/incomeTax/process`,processIncomeTax);
}

//==================================Tax Challan=============================================
saveTaxChallan(taxChallan:TaxChallan){
return this.http.post(environment.apiUrl+'/incometax/taxchallan/savetaxchallan',taxChallan)
}


getAllTaxGroupName(){
  return this.http.get(environment.apiUrl+'/incometax/taxgroup/getallgroup');
}

getTaxChallanList(comid:number){
  return this.http.get(environment.apiUrl+`/incometax/taxchallanlist/comid/${comid}`);
}

getTaxChallanListByTaxYearId(taxYearId:number,comid:number){
return this.http.get(environment.apiUrl+`/incometax/taxchallanlist/comid/${comid}/taxyearid/${taxYearId}`);
}

getTaxChallanById(id:number,comid:number){
return this.http.get(environment.apiUrl+`/incometax/taxchallanbyid/id/${id}/comid/${comid}`);
}

//====================================Challan Prepare========================================

updateChallanNumber(challanPrepare:ChallanNumberAssaign){
  return this.http.put(environment.apiUrl+'/incometax/challanprepare/updatechallanumber',challanPrepare)
}

showAll(paymenttype:number,periodId:number,bonustype:number, gradeValue?:number,branch?:number,companyid?:number){

  return this.http.get(environment.apiUrl+`/incometax/challanprepare/showall/${paymenttype}/${periodId}/${bonustype}/${gradeValue}/${branch}/${companyid}`)
}

saveChallanPrepare(challanPrepare:ChallanPrepair){

  return this.http.post(environment.apiUrl+'/incometax/challanprepare/savechallanprepare',challanPrepare)
}



//====================================Tax Return ================================================

saveTaxReturn(incomeTaxReturn:IncomeTaxReturn){
  return this.http.post(environment.apiUrl+'/incometax/incometaxreturn/save',incomeTaxReturn);
}

checkTaxReturn(empCode:string,taxYearId:number,comId:number){
return this.http.get(environment.apiUrl +'/incometax/incometaxreturn/checkincometaxreturn/'+empCode+'/'+taxYearId+'/'+comId);
}

// ================================== Block Tax Calculation ==============================================

blockTaxCalculation(blockTaxCalculation:TaxCalculation){
  return this.http.post(environment.apiUrl+`/incometax/blocktaxcalculation/process`,blockTaxCalculation);
}

//==================================  Other Tax Calculation =====================================

otherTaxCalculation(otherTaxCal:TaxCalculation){
  return this.http.post(environment.apiUrl+`/incometax/othertaxcalculation/process`,otherTaxCal);
}


//=================================== Tax Adjust ==============================================

procesEmpTAxAdjust(taxid:number,userTypeId:number,comid:number,grade:number){
  return this.http.get(environment.apiUrl+`/incometax/taxadjust/${taxid}/${userTypeId}/${comid}/${grade}`);
}

processTaxCard(taxcard:TaxCardModel){
  return this.http.post(environment.apiUrl+`/incomeTax/card/process`,taxcard);
}

}
