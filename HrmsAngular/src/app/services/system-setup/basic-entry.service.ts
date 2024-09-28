import { Thana } from './../../models/system-setup/thana.model';
import { TempStorageData } from './../../models/security/client-side-storage.model';
import { BasicEntry } from './../../models/system-setup/basic-entry.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class BasicEntryService {

  constructor(private http: HttpClient, private authService:AuthService) { }

  httpHeader =  new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+TempStorageData.token
    })

  getAllBasicItems(tableName:string, compId:number) {
    const url = environment.apiUrl + `/setup/basic/get/tableName/${tableName}/compId/${compId}`;
    return this.http.get(url,{headers:this.httpHeader});
  }
  saveOrUpdateBasicEntry(basicEntry: BasicEntry) {
    return this.http.post(environment.apiUrl + `/setup/basic/saveupdatebasicentry`, basicEntry)
  }

  deleteBasicEntry(tableName:string,id:number,companyID:number) {
    return this.http.delete(environment.apiUrl + `/setup/basic/tableName/`+tableName+'/id/'+id+'/compID/'+companyID);
  }

  getByIdBasicEntry(basicentry: BasicEntry) {
    return this.http.post(environment.apiUrl + `/setup/basic/getbyidbasicentry`, basicentry)
  }

  //////////////////////////

  getBank() {
    return this.http.get(environment.apiUrl + '/setup/basic/bank/get');
  }

  getBankBranches() {
    return this.http.get(environment.apiUrl + '/setup/basic/bank/getbankbranch');
  }
  getDepartment() {
    return this.http.get(environment.apiUrl + '/setup/basic/department/get');
  }
  getDepartmentGL() {
    return this.http.get(environment.apiUrl + '/setup/basic/departmentgl/get');
  }
  getSection() {
    return this.http.get(environment.apiUrl + '/setup/basic/section/get');
  }
  getLocation() {
    return this.http.get(environment.apiUrl + '/setup/basic/Location/get');
  }
  getCountry() {
    return this.http.get(environment.apiUrl + '/setup/basic/country/get');
  }
  getDivision() {
    return this.http.get(environment.apiUrl + '/setup/basic/division/get');
  }
  getDistricts(divisionId: number) {
    return this.http.get(environment.apiUrl + '/setup/basic/district/get/divisionId/' + divisionId);
  }
  getUpazila(districtId: number) {
    return this.http.get(environment.apiUrl + '/setup/basic/upazila/get/districtId/' + districtId);
  }
  getThana(upazilaId: number) {
    return this.http.get(environment.apiUrl + '/setup/basic/thana/get/upazilaId/' + upazilaId);
  }
  saveThana(thana:Thana){
  return this.http.post(environment.apiUrl+'/setup/basic/saveThana/ThanaName/UpazilaID/',thana);
  }
  getAllThana(){
    return this.http.get(environment.apiUrl+'/setup/basic/getAllThana');
  }
  getThanaDependency(thanaId:number){
    return this.http.get(environment.apiUrl+'/setup/basic/thanaDependency/get/thanaId/'+thanaId)
  }
  getNationality() {
    return this.http.get(environment.apiUrl + '/setup/basic/nationality/get');
  }
  getGender() {
    return this.http.get(environment.apiUrl + '/setup/basic/gender/get');
  }
  getReligion() {
    return this.http.get(environment.apiUrl + '/setup/basic/religion/get');
  }
  getBlood() {
    return this.http.get(environment.apiUrl + '/setup/basic/blood/get');
  }
  getEduLevel() {
    return this.http.get(environment.apiUrl + '/setup/basic/educationLevel/get');
  }
  getEduGroup() {
    return this.http.get(environment.apiUrl + '/setup/basic/educationGroup/get');
  }
  getEduBoard() {
    return this.http.get(environment.apiUrl + '/setup/basic/edu/board/get');
  }
  getInstitute() {
    return this.http.get(environment.apiUrl + '/setup/basic/institute/get');
  }
  getResult() {
    return this.http.get(environment.apiUrl + '/setup/basic/result/get');
  }
  getPassingYear() {
    return this.http.get(environment.apiUrl + '/setup/basic/passingYears/get');
  }
  getTrainingType() {
    return this.http.get(environment.apiUrl + '/setup/basic/training/type/get');
  }
  getTrainingCountry() {
    return this.http.get(environment.apiUrl + '/setup/basic/training/country/get');
  }
  getTrainingInstitute() {
    return this.http.get(environment.apiUrl + '/setup/basic/training/institute/get');
  }
  getTrainingNature() {
    return this.http.get(environment.apiUrl + '/setup/basic/training/nature/get');
  }
  getTrainingSponsorBy() {
    return this.http.get(environment.apiUrl + '/setup/basic/training/sponsor/get');
  }
  getProject() {
    return this.http.get(environment.apiUrl + '/setup/basic/project/get');
  }
  getOccupation() {
    return this.http.get(environment.apiUrl + '/setup/basic/occupation/get');
  }
  getExperienceType() {
    return this.http.get(environment.apiUrl + '/setup/basic/experience/type/get');
  }
  getPunishment() {
    return this.http.get(environment.apiUrl + '/setup/basic/punishment/get');
  }
  getBranch() {
    return this.http.get(environment.apiUrl + '/setup/basic/branch/get');
  }
  getSignatory(compId:number){
    return this.http.get(environment.apiUrl+'/setup/basic/signatory/get/compId/'+compId);
  }
  getUnit() {
    return this.http.get(environment.apiUrl + '/setup/basic/unit/get');
  }
  getMisconduct() {
    return this.http.get(environment.apiUrl + '/setup/basic/misconduct/get');
  }
  getPrefix() {
    return this.http.get(environment.apiUrl + '/setup/basic/prefix/get');
  }
  getSuffix() {
    return this.http.get(environment.apiUrl + '/setup/basic/suffix/get');
  }
  getPublicationType() {
    return this.http.get(environment.apiUrl + '/setup/basic/publication/type/get');
  }
  getRelationship() {
    return this.http.get(environment.apiUrl + '/setup/basic/relationship/get');
  }

  getDesignation() {
    return this.http.get(environment.apiUrl + '/setup/basic/designation/get');
  }
  getJobType() {
    return this.http.get(environment.apiUrl + '/setup/basic/job/type/get');
  }
  getBankBranch() {
    return this.http.get(environment.apiUrl + '/setup/basic/bank/branch/get');
  }
  getOrganization() {
    return this.http.get(environment.apiUrl + '/setup/basic/organization/get');
  }

  getShowcaseRules() {
    return this.http.get(environment.apiUrl + '/setup/basic/showcauserules/get')
  }

  getAllShowCauseResultType() {
    return this.http.get(environment.apiUrl + '/setup/basic/showcauserulestype/get')
  }

  getAllShowCauseResultDetails() {
    return this.http.get(environment.apiUrl + '/setup/basic/showcauseresultdetails/get');
  }

  getAllAction() {
    return this.http.get(environment.apiUrl + '/setup/basic/action/get')
  }

  getAllPunishmentType() {
    return this.http.get(environment.apiUrl + '/setup/basic/natureofpunishment/getall');
  }
  getProductionUnit(compId: number) {
    return this.http.get(environment.apiUrl + '/setup/basic/productionunit/get/' + compId);
  }
  getProductionLine(compId: number, unitId: number) {
    return this.http.get(environment.apiUrl + '/setup/basic/prodctionline/get/compId/' + compId + '/unitId/' + unitId);
  }
  getMaritalStatus() {
    return this.http.get(environment.apiUrl + '/setup/basic/maritalStatus/get');
  }
  getDesignationPublication(){
    return this.http.get(environment.apiUrl + '/setup/basic/designationPublication/get');
  }

  //get Type List
  getAllSalaryType(){
   return this.http.get(environment.apiUrl+`/setup/basic/type/getall`);
  }

  getAllBusinessnature(compId:number, departmentId=-1) {
    let deptId = (departmentId!=null)?departmentId:-1;
    return this.http.get(environment.apiUrl + `/setup/basic/businesNature/get/compId/${compId}/departmentId/${deptId}`);
  }
  saveOrUpdateBusinessNature(businessNature) {
    return this.http.post(environment.apiUrl + `/setup/basic/businessNature/saveupdate`, businessNature)
  }

  deleteBusinessNature(id:number,companyID:number) {
    return this.http.delete(environment.apiUrl + `/setup/basic/businessNature/id/${id}/compID/${companyID}`);
  }
  getByIdBusinessNature(id) {
    return this.http.get(environment.apiUrl + `/setup/basic/businessNature/get/id/${id}`)
  }
}
