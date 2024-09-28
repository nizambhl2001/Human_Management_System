export class IncomeTaxSetup{
    id :number;
    salaryHeadID :number;
    taxYearID :number;
    taxYearName :string;
    exemption :string;
    exempAmount :number;
    exempPercent :number;
    exempPercentOfID :number;
    exempMaxAmount :number;
    exempRule :string;
    createdDate ?:string;
    sortOrder :number;
    companyID :number;
    accountName:string;
}