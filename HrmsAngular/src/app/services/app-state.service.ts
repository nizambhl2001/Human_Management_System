import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor() { }

  private readonly _assignedPages = new BehaviorSubject<any[]>([]);

  readonly assignedPages$ = this._assignedPages.asObservable();

   get assignedPages():any[]{
    return this._assignedPages.getValue();
  }

 set assignedPages(val:any[]){
    this._assignedPages.next(val)
  }

  storeAssignedPages(items:any[]){
    this.assignedPages = items;
  }
  remove(){
    this.assignedPages = [];
  }
 
}
