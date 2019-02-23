import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ViewAssetGatePassComponent } from '../GatePassManagement/view-asset-gate-pass/view-asset-gate-pass.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared-module.module';

@NgModule({
    imports: [
        CommonModule,       
        DashboardRoutingModule,
        ModalModule.forRoot(),
        FormsModule,       
        ModalModule.forRoot()  ,
        HttpClientModule,
        SharedModule     
    ],
    declarations: [
        DashboardComponent,ViewAssetGatePassComponent
    ],
    entryComponents:[ViewAssetGatePassComponent]
   
})
export class DashboardModule {}
