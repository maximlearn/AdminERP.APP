import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { AddRoleComponent } from './add-role/add-role.component';
import { SearchRoleComponent } from './search-role/search-role.component';

@NgModule({
  declarations: [AddRoleComponent, SearchRoleComponent],
  imports: [
    CommonModule,
    RoleManagementRoutingModule
  ]
})
export class RoleManagementModule { }
