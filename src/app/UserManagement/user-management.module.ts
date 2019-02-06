import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { SharedModule } from '../shared/shared-module.module';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AddUserComponent],
  imports: [  
    UserManagementRoutingModule,
    CommonModule,
    FormsModule,    
    AgGridModule.withComponents([AddUserComponent]),
    BsDatepickerModule.forRoot(),    
    HttpClientModule,
    SharedModule

  ]
})
export class UserManagementModule { }
