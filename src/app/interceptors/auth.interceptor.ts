import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token");
    let newRequest : HttpRequest<any>;

    newRequest = request.clone({
      headers: request.headers.set("Authorization","Bearer " + token)
    });
   
    return next.handle(newRequest).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.error.message == "UserAccountNotFountException") {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        this.router.navigate(["/login"])
        }
        return throwError(response);
      }
    ));
  }
}
