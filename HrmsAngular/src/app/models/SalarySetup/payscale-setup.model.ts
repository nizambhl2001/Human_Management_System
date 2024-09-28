import { DetailsPayscaleSetup } from "./payscale-setup-details.model";

export class PayscaleSetup{
    id :number;
    gradeValue :number;
    companyID:number;
    gradeName :string;
    gradeSerial :number;
    payscaleYear :string;
    tag :number;
    details:DetailsPayscaleSetup[];
}
