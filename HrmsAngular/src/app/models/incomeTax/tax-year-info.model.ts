import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
export class TaxYearInfo {
      id :number;
      taxYearName :string;
      startDate :string;
      startDateNgb:NgbDateStruct;
      endDate :string;
      endDateNgb:NgbDateStruct;
      taxInfoID :number;
      sortOrder :number;
      companyID :number;
}
