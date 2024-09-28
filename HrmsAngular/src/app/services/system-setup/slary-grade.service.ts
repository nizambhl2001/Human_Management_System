import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SalaryGradeService {
    constructor(private http: HttpClient) { }
    GetSalaryGrade() {
        return this.http.get(environment.apiUrl + '/system/setup/Salary/Grade/Get');
    }
}