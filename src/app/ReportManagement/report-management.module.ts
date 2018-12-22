import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportManagementRoutingModule } from './report-management-routing.module';
import { AssetReportComponent } from './asset-report/asset-report.component';
import { GatePassReportComponent } from './gate-pass-report/gate-pass-report.component';

@NgModule({
  declarations: [AssetReportComponent,GatePassReportComponent],
  imports: [
    CommonModule,
    ReportManagementRoutingModule
  ]
})
export class ReportManagementModule { }
