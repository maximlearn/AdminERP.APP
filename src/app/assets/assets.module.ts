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

import { AssetComponent } from './asset/asset.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SelectRequiredValidatorDirective } from '../shared/select-required-validator.directive';



@NgModule({
  declarations: [AddAssetComponent, AssetListComponent,
     CompareDateValidatorDirective, AssetComponent],
  imports: [
    CommonModule,
    FormsModule,
    AssetsRoutingModule,
    AgGridModule.withComponents([AssetListComponent]),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()  ,
    HttpClientModule
  ],  
  entryComponents: [AssetComponent]

})
export class AssetsModule { }
