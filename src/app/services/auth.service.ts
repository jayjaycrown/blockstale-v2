import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { of, Observable, Subject, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

const apiUrl = environment.loginApi;
const userUrl = environment.profile;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/fhir+json',
    AUTHORIZATION: ' [jwt]',
    'X-Requested-With': 'XMLHttpRequest',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  token: string;
  user: string;

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  private _refreshNeded$ = new Subject<void>();
  refreshNeded$() {
    return this._refreshNeded$;
  }

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  register(user: any) {
    return this.http
      .post<UserModel>(apiUrl + '/signup', user)
      .pipe(catchError(this.handleError('Register', user)));
  }

  registerAdmin(user: any) {
    return this.http
      .post(userUrl + '/register-new-admin', user, httpOptions)
      .pipe(catchError(this.handleError('registerAdmin', user)));
  }

  verify(data) {
    return this.http
      .get(apiUrl + '/verify/' + data, httpOptions)
      .pipe(catchError(this.handleError('verify')));
  }

  login(authCredentials: any) {
    return this.http.post(apiUrl + '/login', authCredentials).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError(this.handleError('Login', authCredentials))
    );
  }

  adminLogin(authCredentials: any) {
    return this.http
      .post(apiUrl + '/login-admin', authCredentials, httpOptions)
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(this.handleError('Admin Login', authCredentials))
      );
  }

  forgotPassword(data) {
    return this.http
      .post(apiUrl + '/forgot-password', data, httpOptions)
      .pipe(catchError(this.handleError('Forgot Password', data)));
  }

  checkOtp(data) {
    return this.http
      .get(apiUrl + '/password-reset/' + data, httpOptions)
      .pipe(catchError(this.handleError('Check OTP')));
  }

  resetPassword(otp, data) {
    return this.http
      .post(apiUrl + '/password-reset/' + otp, data, httpOptions)
      .pipe(catchError(this.handleError('Reset Password', data)));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


  setUser(user: string, status: string) {
    localStorage.setItem('user', user);
    localStorage.setItem('status', status);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  handleError<T>(operation = 'operation', result?: T) {
    let errorMessage = 'Unknown error!';
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.message}`;
      } else {
        errorMessage = `${error.message}`;
        return throwError(errorMessage);
      }
      // alert(errorMessage);

      // console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
    // alert(message);
  }
}
