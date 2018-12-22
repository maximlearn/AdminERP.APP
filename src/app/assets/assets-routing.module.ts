import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAssetComponent } from '../assets/add-asset/add-asset.component';
import { AssetListComponent } from '../assets/asset-list/asset-list.component';

const routes: Routes = [
  {
    path: 'addasset',
    component: AddAssetComponent
  },
  {
    path: 'listasset',
    component: AssetListComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
