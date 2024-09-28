import { VehicleTaxAssaginComponent } from './vehicle-tax-assagin/vehicle-tax-assagin.component';
import { PropertyNameComponent } from './property-name/property-name.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyCategoryComponent} from './property-category/property-category.component';
import { AssetAdditionComponent } from './asset-addition/asset-addition.component';
import { PropertyAssaignComponent } from './property-assaign/property-assaign.component';
import { PropertyDisposalComponent } from './property-disposal/property-disposal.component';
import { ReportComponent } from './report/report.component';
import { PageGuard } from '../../guards/page.guard';



@NgModule({
  imports: [RouterModule.forChild([
    { path: 'property-category',canActivate: [PageGuard], data:{pageId:35}, component: PropertyCategoryComponent },
    { path: 'property-name',canActivate: [PageGuard], data:{pageId:36}, component: PropertyNameComponent },
    { path: 'vehicle-tax-assagin',canActivate: [PageGuard], data:{pageId:37}, component: VehicleTaxAssaginComponent },
    { path: 'asset-addition',canActivate: [PageGuard], data:{pageId:38}, component: AssetAdditionComponent },
    { path: 'property-assaign',canActivate: [PageGuard], data:{pageId:39}, component: PropertyAssaignComponent },
    { path: 'property-disposal',canActivate: [PageGuard], data:{pageId:40}, component: PropertyDisposalComponent },
    { path: 'report',canActivate: [PageGuard], data:{pageId:41}, component: ReportComponent },
  ])],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
