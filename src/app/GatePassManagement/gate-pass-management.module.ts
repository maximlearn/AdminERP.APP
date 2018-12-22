import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatePassManagementRoutingModule } from './gate-pass-management-routing.module';
import { CreateGatePassComponent } from './create-gate-pass/create-gate-pass.component';
import { ListGatePassComponent } from './list-gate-pass/list-gate-pass.component';

@NgModule({
  declarations: [CreateGatePassComponent,ListGatePassComponent],
  imports: [
    CommonModule,
    GatePassManagementRoutingModule
    
  ]
})
export class GatePassManagementModule { }
