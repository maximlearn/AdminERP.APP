import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsRoutingModule } from './assets-routing.module';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap';
import { AgGridModule} from 'ag-grid-angular/main';


@NgModule({
  declarations: [AddAssetComponent, AssetListComponent],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    AgGridModule.withComponents([AssetListComponent]),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class AssetsModule { }
