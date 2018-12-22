import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'adduser',
    component: AddUserComponent
  },
  {
    path: 'edituser',
    component: EditUserComponent
  },
  {
    path: 'searchuser',
    component: SearchUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
