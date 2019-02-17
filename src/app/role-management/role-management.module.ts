import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { AddRoleComponent } from './add-role/add-role.component';
import { SharedModule } from '../shared/shared-module.module';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AddRoleComponent],
  imports: [
    CommonModule,
    FormsModule,
    RoleManagementRoutingModule,
    AgGridModule.withComponents([AddRoleComponent]),
    HttpClientModule,
    SharedModule

  ]
})
export class RoleManagementModule { }
