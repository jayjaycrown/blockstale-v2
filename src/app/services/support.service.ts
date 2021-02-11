import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, tap, shareReplay, map } from 'rxjs/operators';
import { of, Observable, Subject, throwError, BehaviorSubject } from 'rxjs';
// import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { Support } from '../models/support.model';

const userUrl = environment.profile;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/fhir+json',
    AUTHORIZATION: ' [jwt]',
    'X-Requested-With': 'XMLHttpRequest',
  })
};

@Injectable({
  providedIn: 'root'
})

export class SupportService {




  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: variable-name
  private _refreshNeded$ = new Subject<void>();

  refreshNeded$() {
    return this._refreshNeded$;
  }

  submitTicket(data: any): Observable<Support[]> {
    httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<Support[]>(userUrl + '/create-support-ticket', data, httpOptions).pipe(
      tap(() => {
        this._refreshNeded$.next();
      })
    );
  }

  viewTickets() {
    httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get(userUrl + '/view-my-support', httpOptions).pipe(
    );
  }

  viewAllTickets() {
    httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get(userUrl + '/all-created-support', httpOptions).pipe(
    );
  }

  updateTicket(data) {
    httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.patch(userUrl + '/ticket/' + data, httpOptions).pipe(
      tap(() => {
        this._refreshNeded$.next();
      })
    );
  }
  deleteMyTicket(data) {
    httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.delete(userUrl + '/myticket/' + data, httpOptions).pipe(
      tap(() => {
        this._refreshNeded$.next();
      })
    );
  }

  deleteTicket(data) {
    httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.delete(userUrl + '/ticket/' + data, httpOptions).pipe(
       tap(() => {
         this._refreshNeded$.next();
      })
    );
  }
}
