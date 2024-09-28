import { Injectable } from '@angular/core';

@Injectable()
export class Helper {

  constructor() { }
  public static loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  public static percentAmount(amount: number, percent: number) {
    return (amount * percent) / 100;
  }

  // emailPattern():string{
  //   return "/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";
  // }

  public static getMonthList() {
    return [
      { value: '01', display: 'January' },
      { value: '02', display: 'February' },
      { value: '03', display: 'March' },
      { value: '04', display: 'April' },
      { value: '05', display: 'May' },
      { value: '06', display: 'June' },
      { value: '07', display: 'July' },
      { value: '08', display: 'August' },
      { value: '09', display: 'September' },
      { value: '10', display: 'October' },
      { value: '11', display: 'November' },
      { value: '12', display: 'December' },
    ]
  }

  public static isNullOrEmpty(value:string):boolean{
    return (!value || value=='');
  }

  public static getYearList() {
    let from = (new Date).getFullYear() - 4;
    let to = (new Date).getFullYear() + 5;
    let yearList: any[] = [];
    for (from; from <= to; from++) {
      yearList.push({ value: from, display: from })
    }
    return yearList;
  }

  public static getEmpGradeName(gradeValue: number): string {
    switch (gradeValue) {
      case -1:
        return 'Super Admin';
      case 1:
        return 'Managament';
      case 2:
        return 'Non-Management';
      case 3:
        return 'Manager';
      case 4:
        return 'Higher Management';
      case 5:
        return 'Contractual ';
      default:
        return 'Unknown'
    }
  }
}
