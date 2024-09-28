import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TransferTypeService {
    constructor(private http: HttpClient) { }
    GetTransferType() {
        return this.http.get(environment.apiUrl + '/System/Setup/transfer/type/Get');
    }
}