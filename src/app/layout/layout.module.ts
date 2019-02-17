import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared-module.module';




@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,      
        DashboardModule,
        HttpClientModule,
        NgbDropdownModule,
        SharedModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent]
  
})
export class LayoutModule { }
