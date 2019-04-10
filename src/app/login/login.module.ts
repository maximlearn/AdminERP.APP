import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthClient } from '../sharedservice';
import { NgxLoadingModule } from 'ngx-loading';
import { LoaderComponent } from '../Utility/loader/loader.component';

@NgModule({
  declarations: [LoginComponent,LoaderComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({})
  ]

})
export class LoginModule { }
