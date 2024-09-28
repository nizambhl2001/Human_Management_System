import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class EmpTypeService {
    constructor(private http: HttpClient) { }
    GetEmpType() {
        return this.http.get(environment.apiUrl + '/system/setup/emptype/getall');
    }
}