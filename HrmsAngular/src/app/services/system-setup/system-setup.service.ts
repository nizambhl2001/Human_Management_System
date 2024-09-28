import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BankBranch } from '../../models/system-setup/bank-branch.model';
import { HolydayCalender } from '../../models/system-setup/holyday-calender.model';
import { AssaignDepartmentGlView } from '../../models/system-setup/assaign-department-gl-view.model';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { FloreModel } from '../../models/system-setup/flore.model';
import { LineModel } from '../../models/system-setup/line.model';
import { MachineModel } from '../../models/system-setup/machine.model';

@Injectable({
  providedIn: 'root'
})
export class SystemSetupService {

  constructor(
    private http:HttpClient
  ) { }

  //=========================================Bank Branch ===========================================
  getAllBankBranch(comid:number,bankid:number){
    return this.http.get(environment.apiUrl+`/systemsetup/bankbranch/get/comid/${comid}/bankid/${bankid}`);
  }

  saveOrUpdateBankBranch(bankBranch:BankBranch){
    return this.http.post(environment.apiUrl+`/systemsetup/bankbranch/savebankbranch`,bankBranch);
  }

  deleteBankBranch(id:number){
    return this.http.delete(environment.apiUrl+`/systemsetup/bankbranch/delete/${id}`)
  }

  getByIdBankBranch(id:number){
    return this.http.get(environment.apiUrl+`/systemsetup/bankbranch/getbyid/${id}`);
  }

  //============================================Division Setup=====================================

  getAllDivision(){
    return this.http.get(environment.apiUrl+`/systemsetup/division/getall`);
  }

  saveOrUpdateDivision(bankBranch:BankBranch){
    return this.http.post(environment.apiUrl+`/systemsetup/division/saveorupdate`,bankBranch);
  }

  deleteDivision(id:number){
    return this.http.delete(environment.apiUrl+`/systemsetup/division/delete/${id}`)
  }

  getByIdDivision(id:number){
    return this.http.get(environment.apiUrl+`/systemsetup/division/getbyid/${id}`);
  }

  //======================================= Academic Diciplinary============================

  getAcademicDisList(){
    return this.http.get(environment.apiUrl+`/systemsetup/academicdis/getall`);
  }

  saveOrUpdateAcademicDis(bankBranch:BankBranch){
    return this.http.post(environment.apiUrl+`/systemsetup/academicdis/saveorupdate`,bankBranch);
  }

  deleteAcademicDis(id:number){
    return this.http.delete(environment.apiUrl+`/systemsetup/academicdis/delete/${id}`)
  }

  getByIdAcademicDis(id:number){
    return this.http.get(environment.apiUrl+`/systemsetup/academicdis/getbyid/${id}`);
  }

  //=================================HolyDay Calender ======================================


  getNumOfHolyday(fromDate:string, toDate:string, grade:number){
    return this.http.get(environment.apiUrl+'/setup/holyday/count/fromDate/'+fromDate+'/toDate/'+toDate+'/grade/'+grade);
  }

  getHolydayList(yearMonth:any){
    let paramObj = new HttpParams()
    .set('yearMonth',yearMonth.toString());
    return this.http.get(environment.apiUrl+`/systemsetup/holyday/getholydaylist/yearmonth/`,{params:paramObj})
  }


saveHolyDayCalender(holydayModel:HolydayCalender){
  return this.http.post(environment.apiUrl+`/systemsetup/holyday/saveholyday`,holydayModel);
}


//====================================== Assaign Department GL=====================================

getAllAssaignDepartmentGLList(comid:number){
  return this.http.get(environment.apiUrl+`/systemsetup/assaigndepartmentgl/getlist/${comid}`)
}

assignDepartmentGL(assaignDepartment:AssaignDepartmentGlView){
  return this.http.put(environment.apiUrl+`/systemsetup/assaigndepartmentgl/assign`,assaignDepartment);
}

//===================================== Production Unit =======================================

saveOrUpdateProductionUnit(basicEntryModel:BasicEntry){
 return this.http.post(environment.apiUrl+`/systemsetup/productionunit/saveorupdate`,basicEntryModel);
}


getByIdProductionUnit(id){
  return this.http.get(environment.apiUrl+`/systemsetup/productionunit/getbyid/${id}`);
}

// ================================== Flore Section =======================================================

saveOrUpdateFlore(flore:FloreModel){
    return this.http.post(environment.apiUrl+`/systemsetup/flore/saveorupdate`,flore);
 }

 getAllFlore(){
  return this.http.get(environment.apiUrl+'/setup/setup/flore/get')
  }
  getFloreByProductionUnitId(id:number){
    return this.http.get(environment.apiUrl+`/setup/setup/flore/get/by/ProductionId/id/${id}`)
  }

getFloreByFloreId(id:number){
return this.http.get(environment.apiUrl+`/setup/setup/flore/get/by/id/${id}`);
}

//========================================== Production Line ==================================================

getLineByFloreId(id:number){
  return this.http.get(environment.apiUrl+'/setup/line/get/by/floreId/id/'+id)
}

getFloreList(unitId:number,comid:number){
  return this.http.get(environment.apiUrl+`/setup/line/getflorelist/unitid/${unitId}/comid/${comid}`)
}

getLineList(floreid:number,comid:number){
  return this.http.get(environment.apiUrl+`/setup/line/getlinelist/floreid/${floreid}/comid/${comid}`)
}

getByIdProductionLine(id:number){
  return this.http.get(environment.apiUrl+`/setup/line/getlinebyid/id/${id}`)
}

saveOrUpdateProductionLine(productionLine:LineModel){
  return this.http.post(environment.apiUrl+`/systemsetup/productionline/saveorupdate`,productionLine);
}


//==================================================== Production Machine ==================================================================

getMachineByLineId(id:number){
  return this.http.get(environment.apiUrl+'/setup/machine/get/by/line/id/'+id)
}


getProductionMachineByLineId(lineid:number,comid:number){
  return this.http.get(environment.apiUrl+`/setup/setup/productionmachine/getall/lineid/${lineid}/comid/${comid}`)
}


saveOrUpdateProductionMachine(productionMachine:MachineModel){
  return this.http.post(environment.apiUrl+`/systemsetup/productionmachine/saveorupdate`,productionMachine);
}

getMachineId(id:number){
  return this.http.get(environment.apiUrl+`/setup/machine/getmachinebyid/id/${id}`);
}

}
