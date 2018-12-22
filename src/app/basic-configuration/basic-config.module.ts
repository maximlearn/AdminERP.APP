import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicConfigRoutingModule } from './basic-config-routing.module';
import { AssetCategoryComponent } from './asset-category/asset-category.component';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { ConfigurationComponent } from './configuration/configuration.component';

@NgModule({
  declarations: [AssetCategoryComponent, CompanyComponent, DepartmentComponent, ConfigurationComponent],
  imports: [
    CommonModule,
    BasicConfigRoutingModule
  ]
})
export class BasicConfigModule { }
