import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // we cannot made changes to req, thats why we are creating clone, adding withCredential to allows cookies to be passed in http
    //and we are returning this modifiedReq instead of inital request
    const modifiedReq = req.clone({
      withCredentials: true,
    });

    return next.handle(modifiedReq);
    //if you would like to see evential http request from this interceptor:
    //.pipe(filter(val => val.type === HttpEventType.Response), tap(val => {console.log(val)}));
  }
}
