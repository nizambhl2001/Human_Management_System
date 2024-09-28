import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageGuard } from '../../guards/page.guard';
import { SubledgerComponent } from './subledger/subledger.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path: 'subledger', canActivate: [PageGuard], data:{pageId:241}, component: SubledgerComponent},
  ])],
  exports: [RouterModule]
})
export class ProvidentFundRoutingModule { }
