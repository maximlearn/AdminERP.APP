import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common-service.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loaderService: CommonService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        this.showLoader();
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                headers: request.headers.set("Authorization", 'Bearer '+ currentUser.token)               
            });
        }

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => { 
            if (event instanceof HttpResponse) {
              this.onEnd();
            }
          },
            (err: any) => {
              this.onEnd();
          }));
       // return next.handle(request);
    }

    private onEnd(): void {
        this.hideLoader();
      }
      private showLoader(): void {
        this.loaderService.show();
      }
      private hideLoader(): void {
        this.loaderService.hide();
      }
}