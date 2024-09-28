import { UtilityModule } from './../../utility/utility.module';
import { BasicEntryRoutingModule } from './../system-setup/basic-entry/basic-entry-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourRoutingModule } from './tour-routing.module';
import { TourApplyComponent } from './tour-apply/tour-apply.component';
import { TourApproveComponent } from './tour-approve/tour-approve.component';
import { TourApproveHrComponent } from './tour-approve-hr/tour-approve-hr.component';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { BasicEntryModule } from '../system-setup/basic-entry/basic-entry.module';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  declarations: [TourApplyComponent, TourApproveComponent, TourApproveHrComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TourRoutingModule,
    UtilityModule,
    ReactiveFormsModule,
    BasicEntryModule,
    LaddaModule
  ],
  providers:[NgbDateCustomParserFormatter]

})
export class TourModule { }
