import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { of, Observable, Subject, throwError, BehaviorSubject } from 'rxjs';
// import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';
import { Upload } from '../models/upload.model';

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
export class UserService {
   private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  token: string;
  user: string;

   noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };
  // tslint:disable-next-line: variable-name
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

  convert() {
    httpOptions.headers = httpOptions.headers.set(
      'x-rapidapi-host',
      'bravenewcoin-v1.p.rapidapi.com'
    );
    httpOptions.headers = httpOptions.headers.set(
      'x-rapidapi-key',
      '2a8521c28emsh55a0c3ab7f82bfdp129325jsn47248cb8b1a8'
    );
    const url =
      'https://bravenewcoin-v1.p.rapidapi.com/convert?qty=1&from=btc&to=ngn';

    return this.http
      .get(url, httpOptions)
      .pipe(catchError(this.handleError('Convert')));
  }
  convertNgnToBtc(amount: any) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http.post(userUrl + '/conversion-buy', amount, httpOptions).pipe(
      catchError(this.handleError('Price Conversion: convertNgnToBtc', amount))
    );
  }
  convertBtcToNgn(amount: any) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http.post(userUrl + '/conversion-sell', amount, httpOptions).pipe(
      catchError(this.handleError('Price Conversion: convertBtcToNgn'))
    );
  }

  profile() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/profile', httpOptions)
      .pipe(catchError(this.handleError('profile')));
  }
  adminProfile() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/adminprofile', httpOptions)
      .pipe(catchError(this.handleError('adminprofile')));
  }
  getAllMembers() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/members', httpOptions)
      .pipe(catchError(this.handleError('getAllMembers')));
  }
  deleteMember(memberId) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .delete(userUrl + '/delete-member' + '/' + memberId, httpOptions)
      .pipe(
        catchError(this.handleError('deleteMember', memberId)),
        tap(() => {
          this._refreshNeded$.next();
        })
      );
  }

  upload(upload: File) {
    const formData: FormData = new FormData();
    formData.append('image', upload);
    formData.getAll('image');
    // console.log(formData);
    httpOptions.headers = httpOptions.headers.set(
      'Content-Type',
      'multipart/form-data'
    );
    return this.http
      .post<Upload>(userUrl + '/upload-pics', formData, httpOptions)
      .pipe(
        catchError(this.handleError('upload', formData)),
        tap(() => {
          this._refreshNeded$.next();
        })
      );
  }
  bankDetails(bankInfo: any) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .post(userUrl + '/save-bank-details', bankInfo, httpOptions)
      .pipe(
        catchError(this.handleError('upload', bankInfo)),
        tap(() => {
          this._refreshNeded$.next();
        })
      );
  }

  getBankDetails() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/bank-details', httpOptions)
      .pipe(catchError(this.handleError('getBankDetails')));
  }
  adminGetBankDetails() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/user-bank-details', httpOptions)
      .pipe(catchError(this.handleError('adminGetBankDetails')));
  }
  adminDeleteBank(bankId) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .delete(userUrl + '/delete-bank-details' + '/' + bankId, httpOptions)
      .pipe(
        catchError(this.handleError('adminDeleteBank', bankId)),
        tap(() => {
          this._refreshNeded$.next();
        })
      );
  }

  adminUpdateBank(bankId: any, data: any) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .patch(`${userUrl}/bank-details/${bankId}`, data, httpOptions)
      .pipe(
        catchError(this.handleError('adminDeleteBank', data)),
        tap(() => {
          this._refreshNeded$.next();
        })
      );
  }

  upgradeAccount(email) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .post(userUrl + '/account-verify-1', email, httpOptions)
      .pipe(
        catchError(this.handleError('upgradeAccount', email)),
        tap(() => {
          this._refreshNeded$.next();
        })
      );
  }

  verifyToken(token) {
    // alert(token);
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/upgrade-account-1/' + token, httpOptions)
      .pipe(catchError(this.handleError('upgradeAccount', token)));
  }
  upgradetoLevel2(token, data) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .post(userUrl + '/upgrade-account-1/' + token, data, httpOptions)
      .pipe(
        catchError(this.handleError('upgradetoLevel2', data)),
        tap(() => {
          this._refreshNeded$.next();
        })
      );
  }

  upgradeAccount2(bvn) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http.post(userUrl + '/account-verify-2', bvn, httpOptions).pipe(
      catchError(this.handleError('upgradeAccount')),
      tap(() => {
        this._refreshNeded$.next();
      })
    );
  }


  userIsAuthenticated() {
    const userToken = this.getToken();
    if (userToken) {
      return true;
    } else {
      return false;
    }
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  isLoggedOut() {
    return !this.userIsAuthenticated();
  }

  getConversionRates() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/rate', httpOptions)
      .pipe(catchError(this.handleError('getConversionRates')));
  }

  setBuyRates(data) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http.post(userUrl + '/set-buy-rate', data, httpOptions).pipe(
      catchError(this.handleError('setConversionRate', data)),
      tap(() => {
        this._refreshNeded$.next();
      })
    );
  }

  setSellRates(data: any) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http.post(userUrl + '/set-sell-rate', data, httpOptions).pipe(
      catchError(this.handleError('setConversionRate')),
      tap(() => {
        this._refreshNeded$.next();
      })
    );
  }

  buyBtc(data) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .post(userUrl + '/buy-bitcoin', data, httpOptions)
      .pipe(catchError(this.handleError('buy Btc', data)));
  }
  verifyPayment(ref) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/verify-payment/' + ref, httpOptions)
      .pipe(catchError(this.handleError('verify payment')));
  }

  verifyWalletPayment(ref) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .post(userUrl + '/verify-wallet-payment/' + ref, httpOptions)
      .pipe(catchError(this.handleError('verify payment')));
  }

  getWallet() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/my-wallet-balance', httpOptions)
      .pipe(catchError(this.handleError('get Wallet')));
  }


  viewBuyHistory() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/my-transaction-buy', httpOptions)
      .pipe(catchError(this.handleError('viewBuyHistory')));
  }

  adminBuyHistory() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/transaction-buy', httpOptions)
      .pipe(retry(3), catchError(this.handleError('adminBuyHistory')));
  }

  sellBtc(data) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .post(userUrl + '/sell-bitcoin', data, httpOptions)
      .pipe(catchError(this.handleError('sell Btc', data)));
  }
  verifyBTCSent(data) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .post(userUrl + '/verify-bitcoin-sent', data, httpOptions)
      .pipe(catchError(this.handleError('verifyBTCSent', data)));
  }

  viewSellHistory() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/my-transaction-sell', httpOptions)
      .pipe(catchError(this.handleError('viewSellHistory')));
  }

  adminSellHistory() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http
      .get(userUrl + '/transaction-sell', httpOptions)
      .pipe(retry(3), catchError(this.handleError('viewSellHistory')));
  }

  fundWallet(data) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http.post(userUrl + '/fund-wallet', data, httpOptions)
      .pipe(catchError(this.handleError('fundWallet')));
  }
  witdrawFromWallet(amount) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http.post(userUrl + '/submit-withdrawal', amount, httpOptions)
      .pipe(catchError(this.handleError('confirmWitdraw')));
  }
  viewAllWitdraw() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http.get(userUrl + '/all-withdrawals', httpOptions)
      .pipe(catchError(this.handleError('confirmWitdraw')));
  }

  viewAllPayout() {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http.get(userUrl + '/all-payout', httpOptions)
      .pipe(catchError(this.handleError('confirmWitdraw')));
  }

  confirmWitdraw(id) {
     httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http.post(userUrl + '/payout/' + id, httpOptions)
      .pipe(catchError(this.handleError('confirmWitdraw')));
  }


  checkStatus(id) {
    httpOptions.headers = httpOptions.headers.set(
      'Access-Control-Allow-Origin',
      '*'
    );
    return this.http.post(userUrl + '/query-transaction/' + id, httpOptions)
    .pipe(catchError(this.handleError('checkStatus')))
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

  setUser(user: string, status: string) {
    localStorage.setItem('user', user);
    localStorage.setItem('status', status);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private log(message: string) {
    // console.log(message);
    // alert(message);
  }
}
