import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if( request.url.includes(environment.cognito.domain)){
      const token = localStorage.getItem('token') ?? '';
      if(token)
        request = request.clone({
        setHeaders:{
          'Authorization': token ? `Bearer ${token}` : ''
        }
      })
    }
    return next.handle(request);
  }
  
}
