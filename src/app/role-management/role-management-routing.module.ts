import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRoleComponent } from './add-role/add-role.component';
import { SearchRoleComponent } from './search-role/search-role.component';

const routes: Routes = [
  {
    path: 'addrole',
    component: AddRoleComponent
  },
  {
    path: 'searchrole',
    component: SearchRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
