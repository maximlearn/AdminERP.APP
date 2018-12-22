import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetCategoryComponent } from './asset-category/asset-category.component';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'department',
    component: DepartmentComponent
  },
  {
    path: 'category',
    component: AssetCategoryComponent
  },
  {
    path: 'configuration',
    component: ConfigurationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicConfigRoutingModule { }
