import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [AddUserComponent, SearchUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
