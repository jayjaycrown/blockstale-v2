import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { of, Observable, Subject, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoChartService {

  constructor(private http: HttpClient) { }

  getCryptoPrice() {
    const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC&tsyms=NGN'
    return this.http.get(url).pipe(retry(3));
  }
}
