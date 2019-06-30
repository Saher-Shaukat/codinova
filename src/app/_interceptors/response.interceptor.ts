import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.handleError(err.status);
          }
        }
      )
    );
  }

  handleError(errorCode) {
    switch (errorCode) {
      case 404:
        alert("Session has expired. Please login again.");
        break;

      case 500:
      case 404:
      default:
        alert("Something went wrong, Please try again after some time.");
        break;
    }
  }
}

export let responseProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ResponseInterceptor,
  multi: true
};
