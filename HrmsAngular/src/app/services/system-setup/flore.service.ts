import { environment } from './../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FloreModel } from "../../models/system-setup/flore.model";

@Injectable({
    providedIn: 'root'
  })
  export class FloreService {

    constructor(private http:HttpClient) { }
   
  }
