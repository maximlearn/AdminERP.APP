import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { AuthGuardService } from './guards/auth-guard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { API_BASE_URL } from './sharedservice';
import { PdfDownloadComponent } from './Utility/pdf-download/pdf-download.component';




@NgModule({
  declarations: [AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    
    HttpClientModule
   
  ],
  providers: [AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: API_BASE_URL,
      useFactory: () => {
                    return 'https://localhost:44361';
                   //return 'https://adminerp.azurewebsites.net/'
             }
      }
   ],
 
  bootstrap: [AppComponent]
})
export class AppModule { 
  // static forRoot() {
  //   return {
  //     ngModule : AppModule,
  //     providers: [
  //      // { provide: API_BASE_URL, useValue: '/.' }
  //        { provide: API_BASE_URL, useValue: 'https://adminerp.azurewebsites.net/' }
  //     ]
  //   }
  // }
}
