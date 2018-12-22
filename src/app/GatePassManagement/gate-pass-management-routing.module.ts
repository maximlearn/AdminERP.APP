import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGatePassComponent } from './create-gate-pass/create-gate-pass.component';
import { ListGatePassComponent } from './list-gate-pass/list-gate-pass.component';

const routes: Routes = [
  {
    path: 'creategatepass',
    component: CreateGatePassComponent
  },
  {
    path: 'listgatepass',
    component: ListGatePassComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatePassManagementRoutingModule { }
