import { toDate } from '@angular/common/src/i18n/format_date';

import { NgbDateParserFormatter, NgbDateStruct, NgbTimeStruct, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { isNumber } from 'util';
import * as moment from 'moment';
@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('/');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { day: this.toInteger(dateParts[0]), month: null, year: null };
            } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { day: this.toInteger(dateParts[0]), month: this.toInteger(dateParts[1]), year: null };
            } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { day: this.toInteger(dateParts[0]), month: this.toInteger(dateParts[1]), year: this.toInteger(dateParts[2]) };
            }
        }
        return null;
    }

    format(date: NgbDateStruct): string {
        return date ?
            `${isNumber(date.day) ? this.padNumber(date.day) : ''}/${isNumber(date.month) ? this.padNumber(date.month) : ''}/${date.year}` :
            '';
    }

    toInteger(value: any): number {
        return parseInt(`${value}`, 10);
    }

    isNumber(value: any): value is number {
        return !isNaN(this.toInteger(value));
    }

    isInteger(value: any): value is number {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    }

    padNumber(value: number) {
        if (isNumber(value)) {
            return `0${value}`.slice(-2);
        } else {
            return '';
        }
    }
    padLeft(value:number, length:number):string{
        let val = value+'';
        while(val.length<length){val = '0'+val}
        return val;
    }

    ngbDateToString(ngbDate: NgbDateStruct): string {
        if (ngbDate == null) { return null; }
        return ngbDate.day + '/' + ngbDate.month + '/' + ngbDate.year;
    }

    stringToNgbDate(date: string): NgbDateStruct {
        if (date == null) { return null; }
        let myDate: Date = new Date(date);
        let ngbDate: NgbDateStruct = {
            year: myDate.getFullYear(),
            month: myDate.getMonth() + 1,
            day: myDate.getDate()
        };
        return ngbDate;
    }
    dateToNgbDate(date: Date): NgbDateStruct {
        if(date==null){
          return {year:null,month:null,day:null}
        }
        let ngbCustomDate: NgbDateStruct = {year:0,month:0,day:0};
        ngbCustomDate.year = date.getFullYear();
        ngbCustomDate.month = date.getMonth();
        ngbCustomDate.day = date.getDate();
        return ngbCustomDate;
    }
    ngbDateToDate(ngbDate: NgbDateStruct): Date {
        if (ngbDate == null) { return null };
        let date = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
        return date;
    }
    getDateToYyyymmdd(date: Date): string {
        if(date==null){
            return '00000000';
        }
        let yyyymmdd: string;
        yyyymmdd = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0')
        return yyyymmdd;
    }
    getNgbDateToYyyymmdd(date: NgbDateStruct) {
        if (date != null) {
            let y = date.year;
            let m = this.padLeft(date.month, 2);
            let d = this.padLeft(date.day, 2);
            return y.toString() + m + d;
        }else{
            return "00000000";
        }
    }

      // " mm/dd/yyyy to yyyymmdd" Bappy
   getDateToyyyyMMddB(dateStr:string){

    var date = [ dateStr.slice(6, 10),dateStr.slice(3,5),dateStr.slice(0, 2)].join('');
    return date;
}

    // "yyyymmdd To mm/dd/yyyy" Bappy
getYyyymmddToDateB(dateStr:string){

  var date = [ dateStr.slice(4, 6),"/", dateStr.slice(6, 8), "/",dateStr.slice(0, 4)].join('');
  return date;
}
    getNgbDateToYyyy_mm_dd(date: NgbDateStruct) {
        let y = date.year;
        let m = this.padLeft(date.month, 2);
        let d = this.padLeft(date.day, 2);
        return y.toString() + '-' + m + '-' + d;
    }
    getCurrentNgbDate(): NgbDateStruct {
        let date: Date = new Date();
        let ngbDate: NgbDateStruct = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        }
        return ngbDate;
    }
    getDateDiff(fromDateNgb: NgbDateStruct, toDateNgb: NgbDateStruct): number {
        let fromDate = this.ngbDateToDate(fromDateNgb);
        let toDate = this.ngbDateToDate(toDateNgb);
        let diff = toDate.getTime() - fromDate.getTime() + 1000 * 3600 * 24;
        let totalDay = Math.ceil(diff / (1000 * 3600 * 24));
        return totalDay;
    }

    getStrToNgbTime(strTime: string): NgbTimeStruct {
        if (strTime != null && strTime != '') {
            let hhmmss = strTime.split(':');
            if (hhmmss.length == 3) {
                let ngbTime: NgbTimeStruct = { hour: parseInt(hhmmss[0]), minute: parseInt(hhmmss[1]), second: parseInt(hhmmss[2]) }
                return ngbTime;
            } else {
                return { hour: null, minute: null, second: null }
            }
        } else {
            return { hour: null, minute: null, second: null }
        }
    }

      getYyyymmddToNgbDate(date:string){
          let ngbDate:NgbDateStruct;
          if(date==null || date.length!=8){
              return ngbDate;
          }
          let y = parseInt(date.substr(0,4));
          let m = parseInt(date.substr(4,2));
          let d = parseInt(date.substr(6,2));
          ngbDate ={year:y,month:m, day:d}
          return ngbDate;
      }
      getYyyymmddToDate(dateStr:string):Date{
        let date:Date=new Date();
        if(dateStr==null || dateStr.length!=8){
            return date;
        }
        let y = parseInt(dateStr.substr(0, 4));
        let m = parseInt(dateStr.substr(4, 2));
        let d = parseInt(dateStr.substr(6, 2));
        date.setFullYear(y);
        date.setMonth(m-1);
        date.setDate(d);
        return date;
    }

    getHhmmssToNgbTime(time: string) {
        let ngbTime: NgbTimeStruct;
        if (time == null || time.length != 6) {
            return ngbTime;
        }
        let h = parseInt(time.substr(0, 2));
        let m = parseInt(time.substr(2, 2));
        let s = parseInt(time.substr(4, 2));
        ngbTime = { hour: h, minute: m, second: s }
        return ngbTime;
    }
    getNgbTimeToStrTime(ngbTime:NgbTimeStruct){
        if(ngbTime==null){
            return '00:00:00';
        }
        let hour = ngbTime.hour.toString().padStart(2,'0');
        let min = ngbTime.minute.toString().padStart(2,'0');
        let sec = ngbTime.second.toString().padStart(2,'0');
        return hour+':'+min+':'+sec;
    }

    addDays(days:number, date:NgbDateStruct = this.getCurrentNgbDate()):NgbDateStruct{
        let currentDate = this.ngbDateToDate(date);
        currentDate.setDate(currentDate.getDate()+days);
        return {
            day: currentDate.getDate(),
            month: currentDate.getMonth()+1,
            year: currentDate.getFullYear()
        }
    }
    addMonth(month:number, date:NgbDateStruct = this.getCurrentNgbDate()):NgbDateStruct{
      let currentDate = this.ngbDateToDate(date);
      currentDate.setDate(currentDate.getMonth()+month);
      let now = moment();
      return {
          day: currentDate.getDate(),
          month: currentDate.getMonth()+1,
          year: currentDate.getFullYear()
      }
  }

}
