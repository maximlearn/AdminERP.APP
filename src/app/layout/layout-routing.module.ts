import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', component: DashboardComponent},
            { path: 'role', loadChildren: '../role-management/role-management.module#RoleManagementModule' },
            { path: 'user', loadChildren: '../UserManagement/user-management.module#UserManagementModule' },
            { path: 'basicconfig', loadChildren: '../basic-configuration/basic-config.module#BasicConfigModule' },
            { path: 'assets', loadChildren: '../assets/assets.module#AssetsModule' },
            { path: 'gatepass', loadChildren: '../GatePassManagement/gate-pass-management.module#GatePassManagementModule' },
            { path: 'report', loadChildren: '../ReportManagement/report-management.module#ReportManagementModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
