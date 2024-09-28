import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidentFundRoutingModule } from './provident-fund-routing.module';
import { SubledgerComponent } from './subledger/subledger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SubledgerComponent],
  imports: [
    CommonModule,
    ProvidentFundRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProvidentFundModule { }
