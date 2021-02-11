import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) {
        // alert('Not logged in');
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        // tslint:disable-next-line: deprecation
        // location.reload();
        this.router.navigate(['/login']);
      }

      const error = err.error || err.message;
      // alert(JSON.stringify(error))
      return throwError(error);
    }));
  }
}


