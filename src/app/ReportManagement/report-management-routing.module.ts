import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GatePassReportComponent } from './gate-pass-report/gate-pass-report.component';
import { AssetReportComponent } from './asset-report/asset-report.component';

const routes: Routes = [
  {
    path: 'gatepassreport',
    component: GatePassReportComponent
  },
  {
    path: 'assetreport',
    component: AssetReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportManagementRoutingModule { }
