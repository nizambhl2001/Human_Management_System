import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  constructor(private http: HttpClient) {

  }
  //Application Module
  saveAppModule(module) {
    return this.http.post(environment.apiUrl + '/security/appModule/save', module);
  }
  getAppModule(id?: number) {
    return this.http.get(environment.apiUrl + '/security/appModule/get/id/' + id);
  }
  deleteAppModule(id: number) {
    return this.http.delete(environment.apiUrl + '/security/appModule/delete/id/' + id);
  }

  //Application Page
  saveAppPage(page) {
    return this.http.post(environment.apiUrl + '/security/appPage/save', page);
  }
  getAppPage(id?: number) {
    return this.http.get(environment.apiUrl + '/security/appPage/get/id/' + id);
  }
  deleteAppPage(id: number) {
    return this.http.delete(environment.apiUrl + '/security/appPage/delete/id/' + id);
  }
  //Assign Page
  assignPageInRole(assignedPage) {
    return this.http.post(environment.apiUrl + '/security/assignPage/role', assignedPage);
  }
  assignPageInUser(assignedPage) {
    return this.http.post(environment.apiUrl + '/security/assignPage/user', assignedPage);
  }
  getAssignedPagesByRole(userTypeId: number, companyId: number) {
    return this.http.get(environment.apiUrl + `/security/assignedPage/get/userTypeId/${userTypeId}/companyId/${companyId}`)
  }
  getAssignedPagesByUser(userId: number, companyId: number) {
    return this.http.get(environment.apiUrl + `/security/assignedPage/get/userId/${userId}/companyId/${companyId}`)
  }

  backupDatabase() {
    return this.http.get(environment.apiUrl + '/security/backup');
    // .pipe(
    //   map(event => this.getEventMsg(event)),
    //   catchError(this.handleError)
    // )
  }

  downloadBackupFile(filePath){
    const paramObj = new HttpParams()
    .set('filePath', filePath)
    return this.http.get(environment.apiUrl+'/security/backup/download',{params:paramObj});
  }
  checkTodaysBackup(){
    return this.http.get(environment.apiUrl+'/security/backup/check');
  }

  // private getEventMsg(event:HttpEvent<any>){
  //   switch(event.type){
  //     case HttpEventType.UploadProgress:
  //       return this.backupProgress(event);
      
  //       case HttpEventType.DownloadProgress:
  //         return null;
      
  //       case HttpEventType.Response:
  //         return this.backupResponse(event)

  //       default:
  //         return 'Database backup'
  //   }
  // }

  // private backupProgress(event){
  //   const percentDone = Math.round(100*event.loaded/event.total)
  //   return {status:'progress', message:percentDone}
  // }
  // private backupResponse(event){
  //   return event.body;
  // }
  // private handleError(error:HttpErrorResponse){
  //   if(error.error instanceof ErrorEvent){
  //     console.error('An error occurred: '+error.error.message);
  //   }
  //   else{
  //     console.error(`Backend return code ${error.status} , `+`body was ${error.error.statusText}`);
  //   }
  //   return throwError('Something Bad happened, Try again letter!');
  // }

}
