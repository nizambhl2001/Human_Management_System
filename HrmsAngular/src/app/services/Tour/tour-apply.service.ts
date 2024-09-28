import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { TourApplyModel } from "../../models/tour/tour-apply.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TourApplyService {
  constructor(private http: HttpClient) { }
  saveUpdateTour(tourModel: TourApplyModel) {
    return this.http.post(environment.apiUrl + '/tour/apply/saveUpdate', tourModel)
  }
  getAll() {
    return this.http.get(environment.apiUrl + '/tour/getAll');
  }
  getById(id: number) {
    return this.http.get(environment.apiUrl + '/tour/getById/id/' + id)
  }
  getTourList(reqTo: string, compID: number,pOption:number) {
    var param = new HttpParams()
      .set('ReqTo', reqTo.toString())
      .set('COmpanyID', compID.toString())
      .set('pOptions', pOption.toString())
    return this.http.get(environment.apiUrl + '/tour/get/list/action', { params: param })
  }
  tourStatus(tourModel: TourApplyModel) {
    return this.http.post(environment.apiUrl + '/tour/status', tourModel);
  }
}
