import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsRoutingModule } from './assets-routing.module';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap';
import { AgGridModule} from 'ag-grid-angular/main';
import { FormsModule } from '@angular/forms';

import { CompareDateValidatorDirective } from '../shared/compare-date-validator.directive';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ViewAssetComponent } from './view-asset/view-asset.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';

import { SharedModule } from '../shared/shared-module.module';



@NgModule({
  declarations: [AddAssetComponent, AssetListComponent,
     CompareDateValidatorDirective, ViewAssetComponent, EditAssetComponent],
  imports: [
    CommonModule,
    FormsModule,
    AssetsRoutingModule,
    AgGridModule.withComponents([AssetListComponent]),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()  ,
    HttpClientModule,
    SharedModule
  ],  
  entryComponents: [ViewAssetComponent,EditAssetComponent]

})
export class AssetsModule { }
