import { DatePipe } from '@angular/common';
import { Injectable } from "@angular/core";



@Injectable()
export class ReportHelper{

    openFileWindow(file:Blob, fileName?:string, save:Boolean=false){
        const data = new Blob([file], {type:file.type})
      if(window.navigator && window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(data, this.getUniqueStr(fileName));
      }else{
        
        var objectUrl = URL.createObjectURL(data);
        window.open(objectUrl);

        if(save){
        var fileLink = document.createElement('a');
        fileLink.href = objectUrl;
        fileLink.download = this.getUniqueStr(fileName);
        
        fileLink.click();
        }
      }
    }

    private getUniqueStr(fileName:string){
      let date = new Date();
      let y = date.getFullYear();
      let m = (date.getMonth()+1).toString().padStart(2,'0');
      let d = date.getDate().toString().padStart(2,'0');
      let h = date.getHours().toString().padStart(2,'0');
      let min = date.getMinutes().toString().padStart(2,'0');
      let s = date.getSeconds().toString().padStart(2,'0');
      fileName = fileName?fileName+'_':'';
      return fileName+y+''+m+''+d+''+h+''+min+''+s;
    }
}
