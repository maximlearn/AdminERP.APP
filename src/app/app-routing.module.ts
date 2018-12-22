import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [

   { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuardService] },
   { path: 'login', loadChildren: './login/login.module#LoginModule' },
   { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
   { path: '**', redirectTo: 'not-found' },
  //  { path: '', component: LayoutComponent, canActivate: [AuthGuardService],
  //  children: [
  //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    // { path: '', children: [
    //   {
    //     path: 'dashboard', component: DashboardComponent
    //   },
    //   {
    //     path: 'addrole', loadChildren: './role-management/role-management.module#RoleManagementModule'
    //   }

    // ]}
// ]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
