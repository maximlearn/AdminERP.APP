import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BasicConfigRoutingModule } from './basic-config-routing.module';
import { AssetCategoryComponent } from './asset-category/asset-category.component';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { TabsModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AssetCategoryComponent, CompanyComponent, DepartmentComponent, ConfigurationComponent],
  imports: [
    CommonModule,
    BasicConfigRoutingModule,
    TabsModule.forRoot(),
    FormsModule,
    AgGridModule.withComponents([DepartmentComponent]),
  ]
})
export class BasicConfigModule { }
