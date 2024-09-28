import { PropertyName } from '../models/Property/property-name.model';
import { PropertyCategory } from '../models/Property/property-category.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetAddition } from '../models/Property/asset-addition.model';
import { TaxAssain } from '../models/Property/tax-assain.model';
import { PropertyDisposal } from '../models/Property/property-disposal.model';
import { AssetAssainModel } from '../models/Property/asset-assain.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }
  //property-Catagory

  saveCategory(propertyCat: PropertyCategory) {
    return this.http.post(environment.apiUrl + '/property/category/save', propertyCat);
  }
  getAllCategory() {
    return this.http.get(environment.apiUrl + '/property/category/getall');
  }
  getCategoryById(id: number) {
    return this.http.get(environment.apiUrl + '/property/category/getbyid/' + id);
  }
  updateCategory(propertyCat: PropertyCategory) {
    return this.http.put(environment.apiUrl + '/property/category/update', propertyCat);
  }
  deleteCategory(id: number) {
    return this.http.delete(environment.apiUrl + '/property/category/delete/' + id);
  }
  //property_Name
  saveName(propertyName: PropertyName) {
    return this.http.post(environment.apiUrl + '/property/name/save', propertyName);
  }
  getAllName() {
    return this.http.get(environment.apiUrl + '/property/name/getall');
  }
  getNameById(id: number) {
    return this.http.get(environment.apiUrl + '/property/name/getbyid/' + id);
  }
  updateName(PropertyName: PropertyName) {
    return this.http.put(environment.apiUrl + '/property/name/update', PropertyName);
  }
  deleteName(id: number) {
    return this.http.delete(environment.apiUrl + '/property/name/delete/' + id);
  }
  //asset_Addition
  assetsave(assetaddition: AssetAddition) {
    return this.http.post(environment.apiUrl + '/property/assetaddition/saveupdate', assetaddition);
  }
  getAllAsset() {
    return this.http.get(environment.apiUrl + '/property/assetaddition/getall');
  }
  getAssetById(id: number) {
    return this.http.get(environment.apiUrl + '/property/assetaddition/getbyid/' + id);
  }
  deleteAsset(id: number) {
    return this.http.delete(environment.apiUrl + '/property/assetaddition/delete/' + id);
  }
  getAllAssetByCategory(id: number) {
    return this.http.get(environment.apiUrl + '/property/name/getbycategoryid/' + id);
  }
  getAssetModel(assetId: number) {
    return this.http.get(environment.apiUrl + '/property/model/get/assetId/' + assetId);
  }
  //property Assain
  getEmpInfo(empCode: string, companyId: number) {
    return this.http.get(environment.apiUrl + '/home/property/getById/empCode/' + empCode + '/companyId/' + companyId);
  }
  saveUpdatePropAssain(propAssain: AssetAssainModel) {
    return this.http.post(environment.apiUrl + '/property/assain/saveupdate', propAssain);
  }
  getAssignedAsset(compId: number, empCode: string) {
    return this.http.get(
      environment.apiUrl + '/property/assigned/compId/' + compId + '/empCode/' + empCode);
  }
  getAssaignAssetById(id:number){
    return this.http.get(environment.apiUrl+'/home/property/get/AssaignAsset/ById/'+id)
  }
  //Tax_Assain
  saveTaxAssain(taxassain: TaxAssain) {
    return this.http.post(environment.apiUrl + '/property/TaxAssain/saveUpdate', taxassain);
  }
  TaxAssainGetById(empCode: string, companyId: number) {
    return this.http.get(environment.apiUrl + '/property/TaxAssain/get/empCode/' + empCode + '/companyId/' + companyId);
  }
  //Property_Dispose
  saveUpdateDispose(dispose: PropertyDisposal) {
    return this.http.post(environment.apiUrl + '/property/disposal/saveupdate/', dispose);
  }
  GetAllDispose(empCode: string, compId: number) {
    return this.http.get(environment.apiUrl + '/home/Property/dispose/getById/empCode/' + empCode + '/compId/' + compId);
  }
  GetDisposeById(empCode: string) {
    return this.http.get(environment.apiUrl + '/property/disposal/getbyid/' + empCode);
  }
}
