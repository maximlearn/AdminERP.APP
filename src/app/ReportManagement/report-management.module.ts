import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportManagementRoutingModule } from './report-management-routing.module';
import { AssetReportComponent } from './asset-report/asset-report.component';
import { GatePassReportComponent } from './gate-pass-report/gate-pass-report.component';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AssetReportComponent,GatePassReportComponent],
  imports: [
    CommonModule,
    ReportManagementRoutingModule,
    AgGridModule.withComponents([GatePassReportComponent,AssetReportComponent]),
    BsDatepickerModule.forRoot(),
    FormsModule
  ]
})
export class ReportManagementModule { }
