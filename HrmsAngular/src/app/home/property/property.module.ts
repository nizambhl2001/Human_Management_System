import { UtilityModule } from './../../utility/utility.module';
import { LaddaModule } from 'angular2-ladda';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCategoryComponent } from './property-category/property-category.component';
import { PropertyRoutingModule } from './property-routing.module';
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { PropertyNameComponent } from './property-name/property-name.component';
import { VehicleTaxAssaginComponent } from './vehicle-tax-assagin/vehicle-tax-assagin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssetAdditionComponent } from './asset-addition/asset-addition.component';
import { PropertyAssaignComponent } from './property-assaign/property-assaign.component';
import { PropertyDisposalComponent } from './property-disposal/property-disposal.component';
import { ReportComponent } from './report/report.component';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchModule } from '../search/search.module';
import { ReportHelper } from '../../shared/report-helper';

@NgModule({
  imports: [
    CommonModule,
    PropertyRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SearchModule,
    LaddaModule,
    UtilityModule
  ],
  declarations: [
    PropertyCategoryComponent,
    PropertyNameComponent,
    VehicleTaxAssaginComponent,
    AssetAdditionComponent,
    PropertyAssaignComponent,
    PropertyDisposalComponent,
    ReportComponent,
  ],
  providers: [NgbDateCustomParserFormatter, ReportHelper]


})
export class PropertyModule { }
