import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class EmployeeLoanInfo {
  id: number;
  empCode: string;
  loanDate: string;
  loanDateNgb: NgbDateStruct;
  salaryHeadID: number;
  installmentStart: number;
  loanAmount: number;
  downPayment: number;
  netLoan: number;
  noofInstallment: number;
  installmentType: number;
  interest: number;
  installmentamount: number;
  remarks: string;
  companyID: number;
  dDMMYY: string;
  empName: string;
  designation: string;
  joinDate: string;
  department: string;
  companyAddress: string;
}
