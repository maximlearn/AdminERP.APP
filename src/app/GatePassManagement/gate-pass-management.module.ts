import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatePassManagementRoutingModule } from './gate-pass-management-routing.module';
import { CreateGatePassComponent } from './create-gate-pass/create-gate-pass.component';
import { ListGatePassComponent } from './list-gate-pass/list-gate-pass.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ViewAssetGatePassComponent } from './view-asset-gate-pass/view-asset-gate-pass.component';
import { EditAssetGatePassComponent } from './edit-asset-gate-pass/edit-asset-gate-pass.component';
import { SharedModule } from '../shared/shared-module.module';
import { PdfDownloadComponent } from '../Utility/pdf-download/pdf-download.component';


@NgModule({
  declarations: [CreateGatePassComponent,ListGatePassComponent, ViewAssetGatePassComponent ,EditAssetGatePassComponent,PdfDownloadComponent],
  imports: [
    CommonModule,
    GatePassManagementRoutingModule,
    FormsModule,
    AgGridModule.withComponents([ListGatePassComponent]),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()  ,
    HttpClientModule,
    SharedModule
   
  ],
  entryComponents: [ViewAssetGatePassComponent,EditAssetGatePassComponent,PdfDownloadComponent]
})
export class GatePassManagementModule { }
