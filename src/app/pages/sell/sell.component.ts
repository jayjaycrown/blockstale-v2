import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { CryptoChartService } from '../../services/crypto-chart.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  successMessage;
  serverErrorMessage;
  btcAmount: any;
  openWallet: boolean;
  message: any;
  rate: any;
  someInfo: number;
  sellRate;
  bankRate;
  sellHistories;
  pending;
  data;
  btcData:any = {};
  ethData:any = {};
  ltcData: any = {};
  xmrData: any = {};
  xrpData: any = {};
  changepositive;
  iconClass;
  ethColor;
  ethIcon;
  ltcColor;
  xmrColor;
  xrpColor;
  ltcIcon;
  xmrIcon;
  xrpIcon;

  sellModel = {
    btcAmount: '',
    email: '',
    coinType: '',
    coinTypeShort: ''
  };

  constructor(private user: UserService, private cryptoChart: CryptoChartService) { }

  ngOnInit(): void {
    this.cryptoChart.getCryptoPrice().subscribe((res: any) => {
      this.data = res;
      this.btcData = this.data.RAW.BTC.NGN;
      if (this.btcData.CHANGEPCTHOUR <= 0) {
        this.changepositive = 'red-text';
        this.iconClass = 'cancelled fa fa-arrow-down';
      } else {
        this.changepositive = 'green-text';
        this.iconClass = 'complete fa fa-arrow-up';
      }
      this.ethData = this.data.RAW.ETH.NGN;
      console.log(this.ethData);
      if (this.ethData.CHANGEPCTHOUR <= 0) {
        this.ethColor = 'red-text';
        this.ethIcon = 'cancelled fa fa-arrow-down';
      } else {
        this.ethColor = 'green-text';
        this.ethIcon = 'complete fa fa-arrow-up';
      }
      this.ltcData = this.data.RAW.LTC.NGN;
      if (this.ltcData.CHANGEPCTHOUR <= 0) {
        this.ltcColor = 'red-text';
        this.ltcIcon = 'cancelled fa fa-arrow-down';
      } else {
        this.ltcColor = 'green-text';
        this.ltcIcon = 'complete fa fa-arrow-up';
      }
      this.xmrData = this.data.RAW.XMR.NGN;
      if (this.xmrData.CHANGEPCTHOUR <= 0) {
        this.xmrColor = 'red-text';
        this.xmrIcon = 'cancelled fa fa-arrow-down';
      } else {
        this.xmrColor = 'green-text';
        this.xmrIcon = 'complete fa fa-arrow-up';
      }

      this.xrpData = this.data.RAW.XRP.NGN;
      if (this.xrpData.CHANGEPCTHOUR <= 0) {
        this.xrpColor = 'red-text';
        this.xrpIcon = 'cancelled fa fa-arrow-down';
      } else {
        this.xrpColor = 'green-text';
        this.xrpIcon = 'complete fa fa-arrow-up';
      }
    }, err => {
        this.serverErrorMessage = err;
        console.log(err);
    })


    this.user.refreshNeded$().subscribe((_) => {
      this.sellHistory();
    });
    this.sellHistory();
    this.convertionRates();
  }
  private convertionRates() {
    this.user.getConversionRates().subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.bankRate = res;
          // this.sellRate = this.bankRate[0].price_rate_sell;
        }
      },
      (err) => {
        this.serverErrorMessage = err;
      }
    );
  }
  private sellHistory() {
    this.serverErrorMessage = '';
    this.user.viewSellHistory().subscribe(
      (res) => {
        this.sellHistories = res;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.sellHistories.length; i++) {
          if (this.sellHistories[i].coin_transfer_status === 'Pending') {
            this.pending = true;
          }
        }
      },
      (err) => {
        this.serverErrorMessage = err;
      }
    );
  }

  fetchNgn(btcAmount, coinType) {
    this.serverErrorMessage = '';
    console.log(btcAmount)
    console.log(coinType)
    const ckAmount = {
      amount: btcAmount.model,
      coinType: coinType.model
    }
    console.log(ckAmount)

    this.user.convertBtcToNgn(ckAmount).subscribe(
      (res: any) => {
        console.log(res);
        this.someInfo = res;
      },
      (err) => {
        this.serverErrorMessage = err;
      }
    );
  }

  onSellBtc(form: NgForm) {
    this.serverErrorMessage = '';
    if (form.value.coinType === 'bitcoin') {
      form.value.coinTypeShort = 'btc';
    } else if (form.value.coinType === 'etherium') {
      form.value.coinTypeShort = 'eth';
    }
    else if (form.value.coinType === 'litecoin') {
      form.value.coinTypeShort = 'ltc';
    }
    else if (form.value.coinType === 'monero') {
      form.value.coinTypeShort = 'xmr';
    }
    else if (form.value.coinType === 'ripple') {
      form.value.coinTypeShort = 'xrp';
    }
    this.btcAmount = form.value.btcAmount;
    console.log(form.value);
    this.user.sellBtc(form.value).subscribe(
      (res: any) => {
        console.log(res);
        window.location.assign(res.hostedUrl)
      },
      (err) => {
        this.serverErrorMessage = err;
      }
    );
  }

  checkStatus(id: any) {
    console.log(id)
    this.successMessage = '';
    this.serverErrorMessage = '';
    this.user.checkStatus(id).subscribe(res => {
      console.log(res)
      this.successMessage = res
    }, err => {
        console.log(err)
        this.serverErrorMessage = err
    })
  }



}
