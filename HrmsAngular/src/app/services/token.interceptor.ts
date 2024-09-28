
import { retry, tap, timeout } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  remember = false;
  constructor(
    private router: Router,
    private appService: AppService
  ) {
    const rememberMe = localStorage.getItem('isRemembered');
    if (rememberMe) {
      if (rememberMe === 'true') {
        this.remember = true;
      }
    }
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + token,
          //'Access-Control-Allow-Origin': '*'
        }
      });
      return next.handle(request).pipe(
        tap(
          success => { },
          err => {
            if (err.status == 401) {
              this.appService.redirect('/user/login')
            }
            else if (err.status == 403) {
              this.appService.redirect('/forbidden');
            }
          }
        )
      );
    } else {
      return next.handle(request.clone());
    }

  }
}



