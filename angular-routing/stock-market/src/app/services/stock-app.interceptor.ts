import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http'
import { Observable, tap } from 'rxjs';
import { UserStoreService } from './user-store.service';

@Injectable()
export class StockAppInterceptor implements HttpInterceptor {

  constructor(private userStore: UserStoreService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userStore.token) {
      const authReq = req.clone({
        headers: req.headers.set(
          'X-AUTH-HEADER',
          this.userStore.token
        )
      });
      console.log('Making an authorized request');
      req = authReq;
    }
    return next.handle(req).pipe(
      tap({
          next: (event: HttpEvent<any>) => this.handleResponse(req, event),
          error: (error: HttpErrorResponse) => this.handleError(req, error)
      }));
    }


  handleResponse(req: HttpRequest<any>, event: HttpEvent<any>) {
    console.log('Handling response for ', req.url, event);
    if (event instanceof HttpResponse) {
      console.log('Request for ', req.url,
          ' Response Status ', event.status,
          ' With body ', event.body);
    }
  }

  handleError(req: HttpRequest<any>, event: HttpErrorResponse) {
    console.error('Request for ', req.url,
          ' Response Status ', event.status,
          ' With error ', event.error);
  }
}